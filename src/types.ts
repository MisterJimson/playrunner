//TODO May be able to pull this out of the Playwright Locator type with some type magic
// instead of having to copy it here
export interface RoleLocator {
  role:
    | "alert"
    | "alertdialog"
    | "application"
    | "article"
    | "banner"
    | "blockquote"
    | "button"
    | "caption"
    | "cell"
    | "checkbox"
    | "code"
    | "columnheader"
    | "combobox"
    | "complementary"
    | "contentinfo"
    | "definition"
    | "deletion"
    | "dialog"
    | "directory"
    | "document"
    | "emphasis"
    | "feed"
    | "figure"
    | "form"
    | "generic"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img"
    | "insertion"
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "main"
    | "marquee"
    | "math"
    | "meter"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "navigation"
    | "none"
    | "note"
    | "option"
    | "paragraph"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "region"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "searchbox"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "strong"
    | "subscript"
    | "superscript"
    | "switch"
    | "tab"
    | "table"
    | "tablist"
    | "tabpanel"
    | "term"
    | "textbox"
    | "time"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem";
  name: string;
}

export interface ExpectAttribute {
  name: string;
  value: string;
  locator: Locator;
}

export interface HasLocator {
  locator: Locator;
}

export interface LabelLocator {
  label: string;
}

export interface PlaceholderLocator {
  placeholder: string;
}

export interface TextLocator {
  text: string;
}

export interface AltTextLocator {
  altText: string;
  exact?: boolean;
}

export interface TitleLocator {
  title: string;
}

export interface TestIdLocator {
  testId: string;
}

export type ClickOn = HasLocator | string;

export interface Fill {
  text: string;
  locator: Locator;
}

export type Locator =
  | RoleLocator
  | LabelLocator
  | PlaceholderLocator
  | TextLocator
  | AltTextLocator
  | TitleLocator
  | TestIdLocator
  | string;

export type ExpectText = ExpectTextWithLocator | string;

export interface ExpectTextWithLocator {
  text: string;
  locator: Locator;
}
