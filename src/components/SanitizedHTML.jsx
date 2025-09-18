import DOMPurify from "dompurify";

export default function SanitizedHTML({ html }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "span",
      "div",
      "br",
    ],
    ALLOWED_ATTR: ["class"],
    ALLOWED_CLASSES: {
      "*": [
        // typography
        /^text-/,
        /^font-/,

        // list
        /^list-/,
        "list-disc",
        "list-decimal",

        // spacing
        /^space-y-/,
        /^pl-/,
        /^pr-/,
        /^ml-/,
        /^mr-/,
        /^mt-/,
        /^mb-/,

        // optional: prose (typography plugin)
        /^prose/,
      ],
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
