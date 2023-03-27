import { IsNumber, IsString } from 'class-validator';

export class AdidasProductDto {
  public product: any;

  public summary: ReviewsSummaryDto;

  public reviews: ReviewDto[];
}

export interface AdidasProduct {
  id: string;
  product_type: string;
  model_number: string;
  name: string;
  meta_data: MetaData;
  view_list: ViewList[];
  dynamic_background_assets: DynamicBackgroundAsset[];
  confirmed_dynamic_background_assets: DynamicBackgroundAsset[];
  attribute_list: AttributeList;
  breadcrumb_list: BreadcrumbList[];
  callouts: Callouts;
  pricing_information: AdidasProductPricingInformation;
  tax_class_id: string;
  product_description: ProductDescription;
  recommendationsEnabled: boolean;
  product_link_list: ProductLinkList[];
  events: Event[];
  post_event_behavior: string;
  variation_list: VariationList[];
}

export interface AttributeList {
  sale: boolean;
  brand: string;
  color: string;
  gender: string;
  outlet: boolean;
  sport: string[];
  closure: string[];
  surface: string[];
  category: string;
  size_page: string;
  sportSub: string[];
  size_fit_bar: SizeFitBar;
  collection: string[];
  search_color: string;
  base_material: string[];
  productType: string[];
  is_dtc_exclusive: boolean;
  personalizable: boolean;
  heel_stack_height: string;
  isCnCRestricted: boolean;
  key_category_code: string;
  mandatory_personalization: boolean;
  sustainability_ethics_compliance_ids: string[];
  customizable: boolean;
  search_color_raw: string;
  is_orderable: boolean;
  isWaitingRoomProduct: boolean;
  isInPreview: boolean;
  specialLaunch: boolean;
  special_launch_type: string;
  sizeTypes: SizeTypes;
  is_flash: boolean;
  is_made_to_be_remade: boolean;
  coming_soon_signup: boolean;
  preview_to: Date;
  product_sizing_category: string;
  size_chart_id: string;
  size_chart_link: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SizeTypes {}

export interface SizeFitBar {
  value: string;
  markerCount: number;
  selectedMarkerIndex: number;
}

export interface BreadcrumbList {
  text: string;
  link: string;
}

export interface Callouts {
  callout_top_stack: CalloutTopStack[];
}

export interface CalloutTopStack {
  id: string;
  title: string;
  sub_title: string;
  iconID: string;
}

export interface DynamicBackgroundAsset {
  type: Type;
  source: Source;
  image_url: string;
  metadata: ConfirmedDynamicBackgroundAssetMetadata;
}

export interface ConfirmedDynamicBackgroundAssetMetadata {
  asset_usage: AssetUsage[];
  asset_category: AssetCategory;
  image_style: ImageStyle;
  view: string;
  usage_terms: UsageTerms;
  sort_order: string;
  subjects: any[];
}

export enum AssetCategory {
  Photography = 'Photography',
}

export enum AssetUsage {
  PDP = 'pdp',
  Plp = 'plp',
}

export enum ImageStyle {
  Standard = 'Standard',
}

export enum UsageTerms {
  ECommerce = 'eCommerce',
}

export enum Source {
  Cloudinary = 'CLOUDINARY',
}

export enum Type {
  Detail = 'detail',
  Other = 'other',
  Standard = 'standard',
}

export interface Event {
  eventType: string;
  channelTypes: string[];
  eventEndDate: Date;
  eventStartDate: Date;
  exclusivityGroup: string;
}

export interface MetaData {
  canonical: string;
  description: string;
  keywords: string;
  page_title: string;
  site_name: string;
}

export interface AdidasProductPricingInformation {
  currentPrice: number;
  standard_price: number;
  standard_price_no_vat: number;
}

export interface ProductDescription {
  title: string;
  text: string;
  subtitle: string;
  usps: string[];
  wash_care_instructions: WashCareInstructions;
  description_assets: DescriptionAssets;
}

export interface DescriptionAssets {
  image_url: string;
  video_url: null;
  poster_url: null;
}

export interface WashCareInstructions {
  care_instructions: any[];
}

export interface ProductLinkList {
  type: string;
  productId: string;
  name: string;
  url: string;
  image: string;
  altImage: string;
  dynamic_background_image: string;
  confirmed_dynamic_background_image: string;
  pricing_information: ProductLinkListPricingInformation;
  search_color: string;
  default_color: string;
  source: Source;
  available_skus: number;
}

export interface ProductLinkListPricingInformation {
  standard_price: number;
}

export interface VariationList {
  sku: string;
  size: string;
}

export interface ViewList {
  type: Type;
  source: Source;
  image_url: string;
  metadata: ViewListMetadata;
}

export interface ViewListMetadata {
  asset_usage: AssetUsage[];
  asset_category: AssetCategory;
  imageStyle: string;
  view: string;
  usageTerms: string;
  sortOrder: string;
  subjects: any[];
}

export class ReviewDto {
  @IsNumber()
  public score: number;
  @IsString()
  public productId: string;
}

export class ReviewsSummaryDto {
  @IsString()
  public productId: string;
  @IsNumber()
  public averageRating: number;
  @IsNumber()
  public reviews: number;
}
