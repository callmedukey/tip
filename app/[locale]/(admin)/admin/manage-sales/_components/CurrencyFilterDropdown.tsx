"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

const CurrencyFilterDropdown = ({
  currencies,
  applyCurrencyFilter,
}: {
  currencies: string[];
  applyCurrencyFilter: (newFilter: string | null) => void;
}) => {
  const t = useTranslations("manageSales");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{t("currencyFilter")}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency}
            onClick={() => applyCurrencyFilter(currency)}
          >
            {currency}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => applyCurrencyFilter(null)}>
          {t("none")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyFilterDropdown;
