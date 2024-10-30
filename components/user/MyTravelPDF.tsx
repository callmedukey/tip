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
            src={"/pdf-header.png"}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </View>
        <View style={{ paddingHorizontal: "8px" }}>
          <View
            style={{
              marginTop: "16px",
              paddingVertical: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <View
              style={{
                border: "2px solid #f1f1f3",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#717486" }}>
                Travel Destinations:
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "GowunBatang",
                }}
              >
                {request.city.slice(0, 3).join(", ")}
                {request.city.length > 3 &&
                  ` + ${request.city.length - 3} more`}
              </Text>
            </View>

            <View
              style={{
                border: "2px solid #f1f1f3",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#717486" }}>
                Travel Period:
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontFamily: "GowunBatang",
                  fontWeight: "bold",
                }}
              >
                {dateToLocalFormattedWithoutTime(
                  request.from as unknown as string
                )}{" "}
                -{" "}
                {dateToLocalFormattedWithoutTime(
                  request.to as unknown as string
                )}
              </Text>
            </View>
            <View
              style={{
                border: "2px solid #f1f1f3",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#717486" }}>
                Travel Purpose:
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontFamily: "GowunBatang",
                  fontWeight: "bold",
                }}
              >
                {request.purpose === "business" ? "Business" : "Leisure"}
              </Text>
            </View>
            <View
              style={{
                border: "2px solid #f1f1f3",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Text style={{ fontSize: "12px", color: "#717486" }}>
                Persons:
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  fontFamily: "GowunBatang",
                  fontWeight: "bold",
                }}
              >
                {request.adults} adults, {request.infants} infants
              </Text>
            </View>
          </View>
          <View
            style={{
              borderTop: "2px solid #f1f1f3",
              paddingTop: "16px",
              marginTop: "8px",
            }}
          >
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "16px",
                fontFamily: "GowunBatang",
              }}
            >
              Travel Summary
            </Text>
          </View>
          <View
            style={{
              marginTop: "20px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "8px",
              padding: "16px",
              marginHorizontal: "auto",
              border: "2px solid #f1f1f3",
              borderRadius: "8px",
            }}
          >
            {request.summary &&
              Array.isArray(request.summary) &&
              request.summary.map((item: any, index) => (
                <View
                  key={index + item.label}
                  style={{
                    minWidth: "40%",
                    maxWidth: "40%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      ...styles.baseText,
                      fontWeight: "semibold",
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text style={{ ...styles.baseText }}>{item.value}</Text>
                </View>
              ))}
          </View>
          <View style={{ borderTop: "2px solid #f1f1f3", paddingTop: "16px" }}>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "16px",
                fontFamily: "GowunBatang",
              }}
            >
              Travel Plan
            </Text>
          </View>
          <View
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            {request.travelPlan &&
              Array.isArray(request.travelPlan as unknown as TravelPlan[]) &&
              (request.travelPlan as unknown as TravelPlan[]).map(
                (item: TravelPlan, index) => (
                  <View
                    key={index + item.day}
                    style={{
                      ...styles.listView,
                      padding: "8px",
                      border: "1px solid #f1f1f3",
                      borderRadius: "8px",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "GowunBatang",
                        fontSize: "16px",
                      }}
                    >
                      {item.day}:{" "}
                      {dateToLocalFormattedWithoutTime(
                        item.date as unknown as string
                      )}{" "}
                      ({item.time})
                    </Text>
                    <Text style={styles.baseText}>{item.placeName}</Text>
                  </View>
                )
              )}
          </View>
          {/* <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          /> */}
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
