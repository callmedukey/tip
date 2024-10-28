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
  family: "Pretendard",
  src: "/PretendardVariable.ttf",
});
// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Pretendard",
  },
  page: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
  },
  section: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "50%",
    flexBasis: "50%",
    flexShrink: 0,
    flexGrow: 1,
  },
  listView: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "16px",
  },

  baseText: {
    fontSize: "16px",
  },
});
const MyTravelPDF = ({ request }: { request: Request }) => {
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
            src={"/dark-logo.png"}
            style={{
              width: "100px",
              height: "auto",
              maxWidth: "100px",
            }}
          />
          <Text style={styles.title}>My Travel</Text>
        </View>
        <View style={{ marginTop: "120px" }}>
          <Text style={styles.baseText}>
            Travel Destinations: {request.city.join(", ")}
          </Text>
          <Text style={styles.baseText}>
            Travel Period:{" "}
            {dateToLocalFormattedWithoutTime(request.from as unknown as string)}{" "}
            - {dateToLocalFormattedWithoutTime(request.to as unknown as string)}
          </Text>
          <Text style={styles.baseText}>
            Travel Purpose:{" "}
            {request.purpose === "business" ? "Business" : "Leisure"}
          </Text>
          <Text style={styles.baseText}>
            Persons: {request.adults} adults, {request.infants} infants
          </Text>
        </View>
        <View style={{ marginTop: "20px" }}>
          {request.summary &&
            Array.isArray(request.summary) &&
            request.summary.map((item: any, index) => (
              <View key={index + item.label} style={styles.listView}>
                <Text style={styles.baseText}>
                  {item.label}: {item.value}
                </Text>
              </View>
            ))}
        </View>
        <View style={{ marginTop: "20px" }}>
          {request.travelPlan &&
            Array.isArray(request.travelPlan as unknown as TravelPlan[]) &&
            (request.travelPlan as unknown as TravelPlan[]).map(
              (item: TravelPlan, index) => (
                <View key={index + item.day} style={styles.listView}>
                  <Text style={styles.baseText}>
                    {item.day}:{" "}
                    {dateToLocalFormattedWithoutTime(
                      item.date as unknown as string
                    )}
                  </Text>
                  <Text style={styles.baseText}>{item.placeName}</Text>
                </View>
              )
            )}
        </View>
      </Page>
    </Document>
  );
};

export const MyTravelPDFView = ({ request }: { request: Request }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "200vh" }}>
      <MyTravelPDF request={request} />
    </PDFViewer>
  );
};

export default MyTravelPDF;
