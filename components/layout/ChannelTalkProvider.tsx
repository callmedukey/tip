"use client";

import React, { useEffect } from "react";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "next-intl";

const ChannelTalkProvider = () => {
  const [session] = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (typeof window === "undefined" || !session || !locale) return;
    if (locale === "ko") {
      ChannelService.loadScript();

      ChannelService.boot(
        session
          ? {
              pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
              language: "ko",
              memberId: session?.userId,
              profile: {
                name: session?.name as string,
              },
            }
          : {
              pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
            }
      );
    } else if (locale === "en") {
      ChannelService.loadScript();
      ChannelService.boot(
        session
          ? {
              pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
              language: "en",
              memberId: session?.userId,
              profile: {
                name: session?.name as string,
              },
            }
          : {
              pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
            }
      );
    }

    return () => {
      ChannelService.shutdown();
    };
  }, [locale, session]);

  return <></>;
};

export default ChannelTalkProvider;
