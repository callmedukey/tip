"use client";
import { TravelPlan } from "@/definitions/request-details";
import { dateToLocalFormattedWithoutTime } from "@/lib/time-formmater";
import type { Request } from "@prisma/client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "GowunBatang",
  fonts: [
    { src: "/GowunBatang-Regular.ttf", fontWeight: 400 },
    { src: "/GowunBatang-Bold.ttf", fontWeight: 700 },
  ],
});
// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  page: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    border: "1px solid #f1f1f3",
  },
  section: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    paddingHorizontal: "16px",
  },
  flexList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid #000",
  },
  listView: {
    display: "flex",
    gap: "0.5rem",
  },
  summaryList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    paddingHorizontal: "16px",
  },
  summaryItem: {
    flexGrow: 1,
    flexShrink: 1,
  },

  baseText: {
    fontSize: "14px",
    fontFamily: "GowunBatang",
  },

  titleText: {
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Times-BoldItalic",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
const MyTravelInvoicePDF = ({
  amount,
  currency,
  paid,
}: {
  amount: number;
  currency: string;
  paid: boolean;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <Image
            src={"/pdf-header.png"}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </View>
        <View style={{ paddingHorizontal: "8px" }}></View>
      </Page>
    </Document>
  );
};

export const MyTravelPDFInvoiceView = ({
  amount,
  currency,
  paid,
}: {
  amount: number;
  currency: string;
  paid: boolean;
}) => {
  return (
    <PDFViewer style={{ width: "100%", height: "200vh" }}>
      <MyTravelInvoicePDF amount={amount} currency={currency} paid={paid} />
    </PDFViewer>
  );
};

export default MyTravelInvoicePDF;
