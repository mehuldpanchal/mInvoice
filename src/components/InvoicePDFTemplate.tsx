"use client";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { InvoiceItem } from "./InvoiceItemsTable";
import type { InvoiceColumn } from "./ColumnSelector";

interface CompanyDetails {
  logo?: string;
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  invoiceNumber: string;
  terms: string;
}

interface BillToDetails {
  clientCompanyName: string;
  clientCompanyAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

interface InvoicePDFProps {
  companyDetails: CompanyDetails;
  billToDetails: BillToDetails;
  items: InvoiceItem[];
  subtotal: number;
  selectedColumns: InvoiceColumn[];
  taxRate?: number;
  comments?: string[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 11,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4a6fa5",
  },
  section: {
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  billToInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  clientCompanyName: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4a6fa5",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 8,
  },
  tableCell: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  descriptionCell: {
    flex: 4,
  },
  smallCell: {
    flex: 1,
    textAlign: "center",
  },
  priceCell: {
    flex: 2,
    textAlign: "right",
    borderRightWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowAlt: {
    backgroundColor: "#f0f4ff",
  },
  totalsContainer: {
    marginTop: 20,
    width: "40%",
    alignSelf: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalsLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  totalsValue: {
    fontSize: 12,
    minWidth: 80,
    textAlign: "right",
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
  },
});

const InvoicePDFTemplate = ({
  companyDetails,
  billToDetails,
  items,
  subtotal,
  selectedColumns = [],
  taxRate = 0,
  comments = []
}: InvoicePDFProps) => {
  if (!companyDetails || !billToDetails || !items) {
    return null;
  }

  const taxDue = subtotal * taxRate;
  const total = subtotal + taxDue;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>INVOICE</Text>

        <View style={styles.section}>
          {companyDetails.logo && (
            <Image
              src={companyDetails.logo}
              style={styles.logo}
            />
          )}
          <Text style={styles.companyName}>
            {companyDetails.companyName}
          </Text>
          <Text style={styles.companyInfo}>
            {companyDetails.companyAddress}
          </Text>
          <Text style={styles.companyInfo}>
            {companyDetails.city ? companyDetails.city + ", " : ""}
            {companyDetails.state ? companyDetails.state + ", " : ""}
            {companyDetails.zip ? companyDetails.zip : ""}
          </Text>
          <Text style={styles.companyInfo}>
            {companyDetails.email} | {companyDetails.phone}
          </Text>
          <Text style={styles.companyInfo}>
            Invoice Number: {companyDetails.invoiceNumber || ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>
            Bill To:
          </Text>
          <Text style={styles.clientCompanyName}>{billToDetails.clientCompanyName}</Text>
          <Text style={styles.billToInfo}>{billToDetails.clientCompanyAddress}</Text>
          <Text style={styles.billToInfo}>
            {billToDetails.city ? billToDetails.city + ", " : ""}
            {billToDetails.state ? billToDetails.state + ", " : ""}
            {billToDetails.zip || ""}
          </Text>
          <Text style={styles.billToInfo}>
            {billToDetails.email} | {billToDetails.phone}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {selectedColumns.includes('srNo') && <Text style={[styles.tableCell, styles.smallCell]}>Sr. No.</Text>}
            {selectedColumns.includes('description') && (
              <Text style={[styles.tableCell, styles.descriptionCell]}>Description</Text>
            )}
            {selectedColumns.includes('quantity') && <Text style={[styles.tableCell, styles.smallCell]}>Qty</Text>}
            {selectedColumns.includes('uom') && <Text style={[styles.tableCell, styles.smallCell]}>UOM</Text>}
            {selectedColumns.includes('netWeight') && <Text style={[styles.tableCell, styles.smallCell]}>Net Weight</Text>}
            {selectedColumns.includes('pricePerItem') && <Text style={[styles.tableCell, styles.priceCell]}>Price per Item</Text>}
            <Text style={[styles.tableCell, styles.priceCell]}>Total Price</Text>
          </View>

          {items.map((item, idx) => (
            <View
              key={idx}
              style={idx % 2 === 1 ? [styles.tableRow, styles.tableRowAlt] : styles.tableRow}
            >
              {selectedColumns.includes('srNo') && <Text style={[styles.tableCell, styles.smallCell]}>{idx + 1}</Text>}
              {selectedColumns.includes('description') && (
                <Text style={[styles.tableCell, styles.descriptionCell]}>
                  {item.description || ""}
                </Text>
              )}
              {selectedColumns.includes('quantity') && <Text style={[styles.tableCell, styles.smallCell]}>{item.quantity || ""}</Text>}
              {selectedColumns.includes('uom') && <Text style={[styles.tableCell, styles.smallCell]}>{item.uom || ""}</Text>}
              {selectedColumns.includes('netWeight') && <Text style={[styles.tableCell, styles.smallCell]}>{item.netWeight || ""}</Text>}
              {selectedColumns.includes('pricePerItem') && (
                <Text style={[styles.tableCell, styles.priceCell]}>
                  {item.pricePerItem?.toFixed(2) || ""}
                </Text>
              )}
              <Text style={[styles.tableCell, styles.priceCell]}>
                {((item.pricePerItem || 0) * (item.quantity || 1)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>{subtotal.toFixed(2)}</Text>
          </View>
          {selectedColumns.includes("tax") && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax ({(taxRate * 100).toFixed(2)}%)</Text>
              <Text style={styles.totalsValue}>{taxDue.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Total</Text>
            <Text style={styles.totalsValue}>{total.toFixed(2)}</Text>
          </View>
        </View>

        {comments.length > 0 && (
          <View style={styles.section}>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 6 }}>
              Comments:
            </Text>
            {comments.map((comment, idx) => (
              <Text key={idx} style={{ fontSize: 10, marginBottom: 4 }}>
                {comment}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.totalsContainer}>
          {companyDetails.terms && companyDetails.terms.trim() !== "" && (
            <View style={{ marginBottom: 10, textAlign: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 4, textAlign: "center" }}>
                Terms & Conditions
              </Text>
              <Text style={{ fontSize: 10, textAlign: "center" }}>
                {companyDetails.terms.split("\\n").map((line, idx) => (
                  <Text key={idx} style={{ textAlign: "center" }}>
                    {line}
                    {"\n"}
                  </Text>
                ))}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDFTemplate;