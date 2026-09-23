import { staticAsset } from "@/resourceCatalogue";

const BRAND_MARK = staticAsset("kslo-english-official-logo_5c0e5ebe.png");

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <img src={BRAND_MARK} alt="" />
    </span>
  );
}
