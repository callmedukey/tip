"use client";

import React from "react";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useAuth } from "../context/AuthContext";
import { useLocale } from "next-intl";

const ChannelTalkProvider = () => {
  const [session] = useAuth();
  const locale = useLocale();
  ChannelService.loadScript();

  ChannelService.boot(
    session
      ? {
          pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
          language: locale === "ko" ? "ko" : "en",
          memberId: session?.userId,
          profile: {
            name: session?.name as string,
          },
        }
      : {
          pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY as string,
        }
  );

  return <></>;
};

export default ChannelTalkProvider;
