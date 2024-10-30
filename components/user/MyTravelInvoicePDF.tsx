"use client";
import {
  customOptions,
  inclusiveOptions,
  packageOptionsKR,
  packageTypeLocale,
} from "@/definitions/packages";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { dateToLocalFormattedWithoutTime } from "@/lib/time-formmater";
import type { Request, User } from "@prisma/client";

interface RequestWithUser extends Request {
  user: Omit<User, "password">;
}

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
});
const MyTravelInvoicePDF = ({
  request,
  locale,
}: {
  request: RequestWithUser;
  locale: string;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <Image
            src={"/black-logo.png"}
            style={{
              width: "80px",
              height: "auto",
            }}
          />
          <View
            style={{
              textAlign: "right",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                fontFamily: "Helvetica",
                textAlign: "right",
              }}
            >
              Travel in your pocket
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              https://travelinyoupocket.com
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 40,
            flexDirection: "column",
            gap: 4,
            display: "flex",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "120px" }}>
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Order Number
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: "14px", fontFamily: "Helvetica" }}>
                {generateOrderNumber(request.id)}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "120px" }}>
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Order Date
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: "14px", fontFamily: "Helvetica" }}>
                {dateToLocalFormattedWithoutTime(request.createdAt.toString())}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Text style={{ fontSize: "14px", fontFamily: "Helvetica-Bold" }}>
              Order Summary
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              Travel Period:{" "}
              {dateToLocalFormattedWithoutTime(request.from.toString())} -{" "}
              {dateToLocalFormattedWithoutTime(request.to.toString())}
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              Destination Cities: {request.city.join(", ")}
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              Persons: {request.adults} adults, {request.infants} infants
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              Package Type:{" "}
              {request.packageType === "all_inclusive"
                ? "All Inclusive"
                : "Custom"}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Text style={{ fontSize: "14px", fontFamily: "Helvetica-Bold" }}>
              Invoiced To
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              {request.user.name}
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              {request.user.email}
            </Text>
            <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
              {request.user.phoneNumber}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 40,
            borderTop: "1px solid #000",
          }}
        >
          <View
            style={{
              paddingVertical: 8,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "60%", minWidth: "60%", maxWidth: "60%" }}>
              <Text style={{ fontSize: "14px", fontFamily: "Helvetica-Bold" }}>
                Order Details
              </Text>
            </View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "20%" }}>
              <Text style={{ fontSize: "14px", fontFamily: "Helvetica-Bold" }}>
                Price
              </Text>
            </View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "20%" }}>
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily: "Helvetica-Bold",
                  textAlign: "right",
                }}
              >
                Currency
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 8,
              borderBottom: "1px solid #e3e3e3",
              borderTop: "1px solid #e3e3e3",
            }}
          >
            <View style={{ width: "60%", minWidth: "60%", maxWidth: "60%" }}>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                {packageTypeLocale["en"][request.packageType]}
              </Text>
            </View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "20%" }}>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                {request.price?.toLocaleString()}
              </Text>
            </View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "20%" }}>
              <Text
                style={{
                  fontSize: "12px",
                  fontFamily: "Helvetica",
                  textAlign: "right",
                }}
              >
                {request.currency}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 8,
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <View style={{ width: "60%", minWidth: "60%", maxWidth: "60%" }}>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                Inclusive of:{" "}
                {locale === "en"
                  ? request.options
                      .map((option) => {
                        let found;
                        found = inclusiveOptions.find(
                          (o) => o.id === option
                        )?.label;
                        if (!found) {
                          found = customOptions.find(
                            (o) => o.id === option
                          )?.label;
                        }
                        return found;
                      })
                      .join(", ")
                  : request.options
                      .map((option) => {
                        let found;
                        found = inclusiveOptions.find(
                          (o) => o.id === option
                        )?.id;
                        if (!found) {
                          found = customOptions.find(
                            (o) => o.id === option
                          )?.id;
                        }
                        return packageOptionsKR[
                          found as keyof typeof packageOptionsKR
                        ];
                      })
                      .join(", ")}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 8,
              borderBottom: "1px solid #e3e3e3",
              backgroundColor: "#e3e3e3",
            }}
          >
            <View
              style={{ width: "60%", minWidth: "60%", maxWidth: "60%" }}
            ></View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "40%" }}>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                Total Price:
              </Text>
            </View>
            <View style={{ width: "20%", minWidth: "20%", maxWidth: "20%" }}>
              <Text
                style={{
                  fontSize: "12px",
                  fontFamily: "Helvetica",
                  textAlign: "right",
                }}
              >
                {request.price?.toLocaleString()} {request.currency}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {locale === "en" && (
            <View
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica-Bold" }}>
                Travel in your pocket [PARIS CLASS]
              </Text>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                Certified Number # 887-86-03126
              </Text>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                286, Toegye-ro, Jung-gu, Seoul, Republic of Korea
              </Text>
            </View>
          )}
          {locale === "ko" && (
            <View
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica-Bold" }}>
                트래블 인 유어 포켓 [주/ 파리클래스]
              </Text>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                사업자 번호 #887-86-03126
              </Text>
              <Text style={{ fontSize: "12px", fontFamily: "Helvetica" }}>
                서울 특별시 중구 퇴계로 286, 6층
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export const MyTravelPDFInvoiceView = ({
  request,
}: {
  request: RequestWithUser;
}) => {
  return (
    <PDFViewer style={{ width: "100%", height: "200vh" }}>
      <MyTravelInvoicePDF request={request} locale={"en"} />
    </PDFViewer>
  );
};

export default MyTravelInvoicePDF;
