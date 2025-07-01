"use client";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { InvoiceItem } from "./InvoiceItemsTable";
import type { InvoiceColumn } from "./ColumnSelector";

interface CompanyDetails {
  logo: string | null;
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  invoiceNumber: string;
  terms: string;
  invoiceDate: string;
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
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 11,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a6fa5",
    marginBottom: 8,
    textAlign: "left",
  },
  invoiceInfo: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: "left",
  },
  headerRight: {
    width: 120,
    height: 60,
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
  billSectionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "flex-start"
  },
  companySection: {
    flex: 1,
    marginRight: 10,
  },
  billToSection: {
    flex: 1,
    marginLeft: 10,
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
  termsTotalsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  termsContainer: {
    marginTop: 20,
    width: "60%",
  },
  termsContainerFullWidth: {
    marginTop: 20,
    width: "100%",
    alignSelf: "flex-start",
  },
  termsSection: {
    marginBottom: 10,
    alignSelf: "flex-start",
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
  totalsRowTotal: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  totalsBorderTop: {
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  totalsBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  totalsLabelLarge: {
    fontWeight: "bold",
    fontSize: 14,
  },
  totalsValueLarge: {
    fontWeight: "bold",
    fontSize: 16,
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
  billBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f0f4ff",
  },
  billBoxLeft: {
    marginRight: 10,
  },
  billBoxRight: {
    marginLeft: 10,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const InvoicePDFTemplate = ({
  companyDetails,
  billToDetails,
  items,
  subtotal,
  selectedColumns = [],
  taxRate = 0
}: InvoicePDFProps) => {
  if (!companyDetails || !billToDetails || !items) {
    return null;
  }

  const taxDue = subtotal * taxRate;
  const total = subtotal + taxDue;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceInfo}>Invoice No # {companyDetails.invoiceNumber || ""}</Text>
            <Text style={styles.invoiceInfo}>Invoice Date: {companyDetails.invoiceDate ? new Date(companyDetails.invoiceDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}</Text>
          </View>
          <View style={styles.headerRight}>
            {companyDetails.logo && companyDetails.logo !== null && (
              <Image
                src={companyDetails.logo}
                style={styles.logo}
              />
            )}
          </View>
        </View>

        <View style={styles.billSectionsContainer}>
          <View style={[styles.billBox, styles.billBoxLeft]}>
            <Text style={styles.billTitle}>Billed By:</Text>
            <Text style={styles.companyName}>{companyDetails.companyName}</Text>
            <Text style={styles.companyInfo}>{companyDetails.companyAddress}</Text>
            <Text style={styles.companyInfo}>
              {companyDetails.city ? companyDetails.city + ", " : ""}
              {companyDetails.state ? companyDetails.state + ", " : ""}
              {companyDetails.zip ? companyDetails.zip : ""}
            </Text>
            <Text style={styles.companyInfo}>
              <Text style={{ fontWeight: "bold" }}>Email: </Text>{companyDetails.email}
            </Text>
            <Text style={styles.companyInfo}>
              <Text style={{ fontWeight: "bold" }}>Phone: </Text>{companyDetails.phone}
            </Text>
          </View>

          {/* Added alt attribute to Image for accessibility */}
          {companyDetails.logo && (
            <Image
              src={companyDetails.logo}
              style={styles.logo}
            />
          )}

          {/* Added alt attribute to Image for accessibility */}
          {companyDetails.logo && (
            <Image
              src={companyDetails.logo}
              style={styles.logo}
            />
          )}

          <View style={[styles.billBox, styles.billBoxRight]}>
            <Text style={styles.billTitle}>Billed To:</Text>
            <Text style={styles.companyName}>{billToDetails.clientCompanyName}</Text>
            <Text style={styles.companyInfo}>{billToDetails.clientCompanyAddress}</Text>
            <Text style={styles.companyInfo}>
              {billToDetails.city ? billToDetails.city + ", " : ""}
              {billToDetails.state ? billToDetails.state + ", " : ""}
              {billToDetails.zip || ""}
            </Text>
            {billToDetails.email && (
              <Text style={styles.companyInfo}>
                <Text style={{ fontWeight: "bold" }}>Email: </Text>{billToDetails.email}
              </Text>
            )}
            {billToDetails.phone && (
              <Text style={styles.companyInfo}>
                <Text style={{ fontWeight: "bold" }}>Phone: </Text>{billToDetails.phone}
              </Text>
            )}
          </View>
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

        <View style={styles.termsTotalsContainer}>
          <View style={styles.termsContainer}>
            {companyDetails.terms && companyDetails.terms.trim() !== "" && (
              <View style={styles.termsSection}>
                <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 4, textAlign: "left" }}>
                  Terms & Conditions
                </Text>
                <Text style={{ fontSize: 10, textAlign: "left" }}>
                  {companyDetails.terms.split("\n").map((line, idx) => (
                    <Text key={idx} style={{ textAlign: "left" }}>
                      {line}
                      {"\n"}
                    </Text>
                  ))}
                </Text>
              </View>
            )}
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
            <View style={[styles.totalsRow, styles.totalsBorderTop, styles.totalsRowTotal]}>
              <Text style={[styles.totalsLabel, styles.totalsLabelLarge]}>Total</Text>
              <Text style={[styles.totalsValue, styles.totalsValueLarge]}>{total.toFixed(2)}</Text>
            </View>
            {/* Removed the thinner bottom border line */}
          </View>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
        <Text style={styles.footer}>This is an electronically generated document, no signature is required.</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDFTemplate;