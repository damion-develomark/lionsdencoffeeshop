import type { ReactNode } from "react";

// Header.tsx is a client module, so its ORDER_ONLINE_URL can't be read from
// this server-rendered data; keep the two in sync.
const ORDER_ONLINE_URL = "https://toasttab.com/lions-den-coffee-shop";
const PHONE = <a href="tel:+18604262809">860-426-2809</a>;

export type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

export const FAQ: FaqItem[] = [
  {
    id: "location",
    question: "Where is Lions Den Coffee Shop located?",
    answer: (
      <>
        Lions Den Coffee Shop is located at{" "}
        <a href="#visit">57 W Main St, Plantsville, CT 06479</a>. We are a local
        coffee shop serving Italian-style coffee, breakfast, lunch, and paninis
        in the heart of Plantsville.
      </>
    ),
  },
  {
    id: "hours",
    question: "What are Lions Den Coffee Shop’s hours?",
    answer: (
      <>
        We are open Monday through Friday from 6:00 AM to 7:00 PM, and Saturday
        and Sunday from 7:00 AM to 7:00 PM. Hours may change on holidays, so
        feel free to call us at {PHONE} before visiting.
      </>
    ),
  },
  {
    id: "menu",
    question: "What does Lions Den Coffee Shop serve?",
    answer: (
      <>
        Lions Den serves Italian-style coffee, espresso drinks, lattes,
        breakfast sandwiches, paninis, pastries, smoothies, and non-coffee
        drinks. Our menu is built for quick stops, relaxed mornings, and casual
        lunch visits.
      </>
    ),
  },
  {
    id: "order-online",
    question: "Can I order online?",
    answer: (
      <>
        Yes. You can order online through our{" "}
        <a href={ORDER_ONLINE_URL} target="_blank" rel="noopener noreferrer">
          Toast ordering page
        </a>{" "}
        or call Lions Den Coffee Shop directly at {PHONE}.
      </>
    ),
  },
  {
    id: "milk-alternatives",
    question: "Does Lions Den have milk alternatives?",
    answer: (
      <>
        Yes. Lions Den offers milk alternatives including oat, almond, and
        coconut milk. Availability may vary, and guests with allergies should
        speak with our team before ordering.
      </>
    ),
  },
  {
    id: "outdoor-seating",
    question: "Does Lions Den have outdoor seating?",
    answer: (
      <>
        Yes. Lions Den has patio seating available when weather and space allow.
        It is a great spot to enjoy coffee, breakfast, or lunch in Plantsville.
      </>
    ),
  },
  {
    id: "menu-prices",
    question: "Where can I see the full menu and prices?",
    answer: (
      <>
        You can view a{" "}
        <a href="#menu">
          selection of popular drinks, breakfast items, and paninis
        </a>{" "}
        on our website. For the full current menu and prices, check our{" "}
        <a href="/lionsden-menu.pdf" target="_blank" rel="noreferrer">
          menu PDF
        </a>{" "}
        or contact the shop at {PHONE}. Menu items and prices may change.
      </>
    ),
  },
  {
    id: "contact",
    question: "How can I contact Lions Den Coffee Shop?",
    answer: (
      <>
        You can call us at {PHONE}, email{" "}
        <a href="mailto:lionsdencoffeect@gmail.com">
          lionsdencoffeect@gmail.com
        </a>
        , or use the <a href="#contact">contact form</a> on the website. We are
        happy to help with questions about the menu, ordering, hours, or
        visiting the shop.
      </>
    ),
  },
];
