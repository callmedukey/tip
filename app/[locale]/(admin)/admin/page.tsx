import { adminLinksKR, adminLinksEN } from "@/definitions/admin-link";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import React from "react";

const AdminPage = async () => {
  const locale = await getLocale();
  return (
    <main className="flex items-center justify-center ">
      <div className="bg-white rounded-[2rem] max-w-lg w-full mx-auto p-4 py-12">
        <nav className="flex flex-col gap-4 items-center">
          {(locale === "ko" ? adminLinksKR : adminLinksEN).map((adminLink) => (
            <Link
              key={adminLink.href}
              href={`/admin/${adminLink.href}`}
              className="text-xl font-medium"
            >
              {adminLink.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
};

export default AdminPage;
