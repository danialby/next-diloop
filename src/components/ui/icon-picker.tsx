"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {icons, LucideProps, LucideIcon, XIcon, XCircle} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type IconName = keyof typeof icons;
type IconsList = { icon: IconName, alias?: string[] }[];

const ICON_BUTTONS: IconsList = Object.keys(icons).map((icon) => ({
  icon: icon as IconName,
  alias: [] as string[]
}));

interface IconPickerProps extends Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, 'onSelect' | 'onOpenChange'> {
  value?: IconName
  defaultValue?: IconName
  onValueChange?: (value: IconName) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  searchable?: boolean
  searchPlaceholder?: string
  triggerPlaceholder?: string
  iconsList?: IconsList
}

const IconPicker = React.forwardRef<
  React.ComponentRef<typeof PopoverTrigger>,
  IconPickerProps
>(({
  value,
  defaultValue,
  onValueChange,
  searchable = true,
  searchPlaceholder = "Search for an icon...",
  iconsList = ICON_BUTTONS,
}, ref) => {
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(defaultValue)

  const handleValueChange = (icon: IconName) => {
    if (value === undefined) {
      setSelectedIcon(icon)
    }
    onValueChange?.(icon)
  }

  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(36);

  const filteredIcons = useMemo(() =>
    search.trim() === ""
      ? iconsList
      : iconsList.filter(({ icon, alias }) =>
          icon.toLowerCase().includes(search.toLowerCase().trim()) ||
          (alias || []).some(alias => alias.toLowerCase().includes(search.toLowerCase().trim()))
        ),
    [search, iconsList]
  );

  useEffect(() => {
    setDisplayCount(36);
  }, [search]);

  const displayedIcons = useMemo(() =>
    filteredIcons.slice(0, displayCount),
    [filteredIcons, displayCount]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 36) {
      setDisplayCount(prev => Math.min(prev + 36, filteredIcons.length));
    }
  };

  return (
      <>
        {searchable && (
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        )}
        {selectedIcon && (
            <span className={`flex w-8 gap-2 items-center justify-start px-2 h-10 w-16 bg-blue-500 rounded-md`}>
                <Icon name={selectedIcon} color={'white'} />
                <XIcon className={`w-4 cursor-pointer`} color={`white`} onClick={() => setSelectedIcon(undefined)} />
            </span>
        )}
        <div
          className="grid grid-cols-10 gap-2 max-h-44 overflow-auto no-scrollbar border rounded-xl shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] p-2"
          onScroll={handleScroll}
        >
          {displayedIcons.map(({ icon }) => (
            <TooltipProvider key={icon}>
              <Tooltip>
                <TooltipTrigger
                  className={
                    `p-2 rounded-md border hover:bg-foreground/10 transition
                    flex items-center justify-center
                    ${selectedIcon === icon && ('bg-blue-500 hover:!bg-blue-500')}`}
                  onClick={(event) => {
                    event.preventDefault()
                    handleValueChange(icon);
                    setDisplayCount(36);
                    setSearch("");
                  }}>
                  <Icon name={icon} color={(selectedIcon === icon) ? 'white' : 'black'} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{icon}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {filteredIcons.length === 0 && (
            <div className="text-center text-gray-500 col-span-4">
              آیکونی یافت نشد
            </div>
          )}
        </div>
      </>
  );
});
IconPicker.displayName = "IconPicker";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

const Icon = React.forwardRef<
  React.ComponentRef<LucideIcon>,
  IconProps
>(({ name, ...props }, ref) => {
  const LucideIcon = icons[name];
  return <LucideIcon ref={ref} {...props} />;
});
Icon.displayName = "Icon";

export { IconPicker, Icon, type IconsList, type IconName };
