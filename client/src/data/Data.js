import {
  UilBook,
  UilClipboardAlt,
  UilUsersAlt,
  UilEdit,
} from "@iconscout/react-unicons";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilBook,
    heading: "Products",
    slug: "products",
  },
  {
    icon: UilUsersAlt,
    heading: "Clients",
    slug: "clients",
  },
  {
    icon: UilEdit,
    heading: "Sales Order",
    slug: "sales-order",
  },
  {
    icon: UilClipboardAlt,
    heading: "Manage Products",
    slug: "manage-products",
  },
];

export const cardsData = [
  {
    title: "Products",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    png: UilBook,
    slug: "products",
  },
  {
    title: "Clients",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    png: UilUsersAlt,
    slug: "clients",
  },
  {
    title: "Sales Order",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    png: UilEdit,
    slug: "sales-order",
  },
  {
    title: "Manage Products",
    color: {
      backGround: "linear-gradient(180deg, #73c2fb 0%, #a1d9ff 100%)",
      boxShadow: "0px 10px 20px 0px #c4e1f9",
    },
    png: UilClipboardAlt,
    slug: "manage-products",
  },
];
