// Local review defaults to the relevant dummy catalogue until real data is ready.
// Set NEXT_PUBLIC_CATALOG_DEMO=false to use approved inventory by default.
export const catalogDemoEnabled =
  process.env.NEXT_PUBLIC_CATALOG_DEMO !== "false";
