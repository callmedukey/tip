"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const CurrencyFilterDropdown = ({
  currencies,
  applyCurrencyFilter,
}: {
  currencies: string[];
  applyCurrencyFilter: (newFilter: string | null) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Currency Filter</DropdownMenuTrigger>
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
          None
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyFilterDropdown;
