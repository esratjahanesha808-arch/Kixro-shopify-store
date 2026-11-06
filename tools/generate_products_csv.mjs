import fs from 'fs';

const GITHUB_REPO_RAW = "https://raw.githubusercontent.com/esratjahanesha808-arch/Kixro-shopify-store/main/asset/product%20images";
const SIZES = ["8", "9", "10", "11"];

const products = [
  // ==========================================
  // SHOES (6 standalone products)
  // ==========================================
  {
    handle: "air-jordan-1-mid-unc-blue",
    title: "Air Jordan 1 Mid – White / University Blue / Red",
    body_html: "<p><strong>Classic heritage meets everyday street style.</strong></p><p>The Air Jordan 1 Mid pairs a crisp white leather base with bold university blue overlays and a striking red Swoosh. Engineered with a premium leather upper and built-in Air cushioning, it delivers iconic looks and all-day comfort.</p><ul><li>Premium leather upper for durability</li><li>Encapsulated Air-Sole cushioning</li><li>Solid rubber traction outsole</li><li>Iconic Jumpman and Wings branding details</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, new-arrivals, best-sellers, trending-now, kixro-essentials",
    variants_colors: [
      {
        color: "Light Blue",
        price: "135.00",
        compare_at_price: "160.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_30_23 AM.png"
      }
    ]
  },
  {
    handle: "urban-retro-platform-sneakers",
    title: "Urban Retro Platform Sneakers – Multi-Color Earth Tones",
    body_html: "<p><strong>Bold style meets everyday comfort.</strong></p><p>Make a statement with these low-top platform sneakers, featuring an eye-catching patchwork design in forest green, soft yellow, warm orange, and cream tones. Built with a chunky, ribbed platform sole and a padded collar, they offer the perfect mix of retro flair and modern street style.</p><ul><li>Textured, ribbed platform sole for extra height and grip</li><li>Multi-color patchwork design in earth tones</li><li>Padded collar and tongue for all-day comfort</li><li>Durable lace-up closure for a secure fit</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, new-arrivals, trending-now, kixro-essentials",
    variants_colors: [
      {
        color: "Multi",
        price: "110.00",
        compare_at_price: "130.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_30_48 AM.png"
      }
    ]
  },
  {
    handle: "nike-mens-motiva-walking-shoes",
    title: "Nike Men's Motiva Walking Shoes – White / Black / Light Volt",
    body_html: "<p><strong>Smooth strides and ultimate cushioning.</strong></p><p>Designed for effortless daily walks and jogs, this performance sneaker features a sleek, breathable white upper contrasted by sharp black laces and iconic Nike swooshes. The chunky, rockered midsole is built to cushion every step, helping you transition smoothly from heel to toe.</p><ul><li>Breathable mesh upper for cool comfort</li><li>Rockered, extra-cushioned midsole for a smooth stride</li><li>Pull tabs on the tongue and heel for easy on-off</li><li>Durable rubber outsole inserts for reliable traction</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, best-sellers, kixro-essentials",
    variants_colors: [
      {
        color: "White",
        price: "125.00",
        compare_at_price: "145.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_31_04 AM.png"
      }
    ]
  },
  {
    handle: "trail-elite-chunky-sneakers",
    title: "Trail Elite Chunky Sneakers – Beige / Sand / White",
    body_html: "<p><strong>Rugged durability meets modern streetwear.</strong></p><p>Tackle any terrain or hit the city streets in style. These performance-inspired chunky sneakers feature a breathable mesh base with durable beige and sand overlays. Built with a supportive, cushioned midsole and a distinct textured heel wrap, they deliver ultimate stability and an edgy, utilitarian look.</p><ul><li>Breathable mesh and synthetic upper for durability</li><li>Thick cushioned midsole for all-day impact absorption</li><li>Heavy-duty lugged rubber outsole for superior grip</li><li>Padded collar and red-accented tongue branding</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, new-arrivals, trending-now, best-sellers",
    variants_colors: [
      {
        color: "Beige",
        price: "140.00",
        compare_at_price: "165.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_31_22 AM.png"
      }
    ]
  },
  {
    handle: "adidas-originals-campus-low",
    title: "Adidas Originals Campus Low Sneakers – Scarlet Red / White",
    body_html: "<p><strong>Timeless low-top heritage.</strong></p><p>Make a bold statement with a timeless silhouette. These low-top lifestyle sneakers feature a premium scarlet red suede upper accented by classic white leather 3-Stripes and matching heel tabs. Built on a crisp white rubber cupsole, they deliver effortless retro appeal and casual everyday comfort.</p><ul><li>Premium textured suede upper for a classic heritage look</li><li>Iconic leather 3-Stripes and Trefoil tongue branding</li><li>Durable rubber cupsole for reliable grip and support</li><li>Secure white lace-up closure with a padded collar</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, best-sellers, trending-now",
    variants_colors: [
      {
        color: "Red",
        price: "115.00",
        compare_at_price: "135.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_31_38 AM.png"
      }
    ]
  },
  {
    handle: "artisan-tapestry-platform-sneakers",
    title: "Artisan Tapestry Platform Sneakers – Off-White / Indigo / Ocean Blue",
    body_html: "<p><strong>Wearable art for the modern streets.</strong></p><p>Elevate your look with these statement low-top sneakers, featuring intricate woven blue and teal tapestry fabric panels set against clean off-white overlays. Anchored by a chunky, dual-tone midsole with bold graphic typography, these shoes seamlessly blend artistic design with a heavy-duty streetwear aesthetic.</p><ul><li>Woven jacquard-style tapestry panels with a rich multi-texture feel</li><li>Chunky cream and indigo rubber sole engineered for durable traction</li><li>Heavy-duty multi-loop lace configuration for a locked-in fit</li><li>Midsole features embossed \"LOOK FOR THE STAR\" text details</li></ul>",
    type: "Shoes",
    tags: "shoe, shoes, new-arrivals, trending-now, kixro-essentials",
    variants_colors: [
      {
        color: "Blue",
        price: "155.00",
        compare_at_price: "180.00",
        category_folder: "shoe",
        image_file: "ChatGPT Image Jul 18, 2026, 01_31_45 AM.png"
      }
    ]
  },

  // ==========================================
  // SANDALS (2 consolidated products)
  // ==========================================
  {
    // Merged: Classic Comfort Lightweight Clogs + Nomad Utility Sports Sandals (Brown)
    // No color in title
    handle: "classic-comfort-lightweight-clogs",
    title: "Classic Comfort Lightweight Clogs",
    body_html: "<p><strong>All-day comfort, effortless slip-on style.</strong></p><p>Upgrade your casual routine with these ultra-lightweight versatile clogs and warm-weather slides. Engineered from water-friendly, durable materials, they offer ventilation ports for breathability and quick drainage, alongside supportive contoured footbeds for everyday indoor or outdoor wear.</p><ul><li>Ventilated ports for breathability and water drainage</li><li>Supportive, shock-absorbing cushioned footbed</li><li>Water-resistant and lightweight construction</li><li>Easy to clean and quick to dry</li></ul>",
    type: "Sandals",
    tags: "sandals, sandal, best-sellers, kixro-essentials, new-arrivals, trending-now",
    variants_colors: [
      {
        color: "Sky Blue",
        price: "55.00",
        compare_at_price: "65.00",
        category_folder: "sandels",
        image_file: "ChatGPT Image Jul 18, 2026, 01_37_19 AM.png"
      },
      {
        color: "Brown",
        price: "85.00",
        compare_at_price: "100.00",
        category_folder: "sandels",
        image_file: "ChatGPT Image Jul 18, 2026, 01_37_06 AM.png"
      }
    ]
  },
  {
    // Merged: Contoured Comfort Recovery Slides (Black) + Minimalist Everyday Slide (Beige) + Trailside Sport (Olive)
    // No color in title
    handle: "contoured-comfort-recovery-slides",
    title: "Contoured Comfort Recovery Slides",
    body_html: "<p><strong>Engineered for post-workout rejuvenation and daily luxury.</strong></p><p>These slides deliver cloud-like cushioning with deep heel cups and generous toe room to give your feet a restorative break. Crafted with pillowy dual-density foam and durable slip-resistant outsoles, they transition effortlessly from poolside lounging to casual city walks.</p><ul><li>Deep heel cup cradles and aligns foot</li><li>Extra-thick cushioned shock-absorbing midsole</li><li>Seamless lightweight and water-friendly construction</li><li>Durable anti-slip traction pattern</li></ul>",
    type: "Sandals",
    tags: "sandals, sandal, kixro-essentials, best-sellers, new-arrivals, trending-now",
    variants_colors: [
      {
        color: "Black",
        price: "52.00",
        compare_at_price: "65.00",
        category_folder: "sandels",
        image_file: "ChatGPT Image Jul 18, 2026, 01_37_54 AM.png"
      },
      {
        color: "Beige",
        price: "48.00",
        compare_at_price: "60.00",
        category_folder: "sandels",
        image_file: "ChatGPT Image Jul 18, 2026, 01_37_45 AM.png"
      },
      {
        color: "Olive",
        price: "78.00",
        compare_at_price: "90.00",
        category_folder: "sandels",
        image_file: "ChatGPT Image Jul 18, 2026, 01_37_34 AM.png"
      }
    ]
  },

  // ==========================================
  // BOOTS (3 products: 2 standalone + 1 consolidated)
  // ==========================================
  {
    handle: "urban-heritage-nubuck-combat-boots",
    title: "Urban Heritage Nubuck Combat Boots – Sand / Black",
    body_html: "<p><strong>Rugged durability meets refined street style.</strong></p><p>Built to withstand the elements while maintaining a clean, modern aesthetic, these high-top tactical combat boots feature a smooth, sand-colored matte upper. Designed with a padded black leather ankle collar for contrast and comfort, they are anchored by a thick, lugged platform sole finished with classic yellow welt stitching.</p><ul><li>Durable, water-resistant matte upper for long-lasting wear</li><li>Padded ankle collar and heavy-duty metal eyelets for secure ankle support</li><li>Thick, lugged rubber platform outsole for maximum traction and grip</li><li>Stylish leather tongue branding patch and rear pull tab for easy on-off</li></ul>",
    type: "Boots",
    tags: "boots, boot, new-arrivals, best-sellers, trending-now",
    variants_colors: [
      {
        color: "Sand",
        price: "185.00",
        compare_at_price: "220.00",
        category_folder: "boots",
        image_file: "ChatGPT Image Jul 18, 2026, 01_39_28 AM.png"
      }
    ]
  },
  {
    handle: "classic-leather-desert-chukka-boots",
    title: "Classic Leather Desert Chukka Boots – Vintage Brown",
    body_html: "<p><strong>A timeless silhouette, crafted for everyday sophistication.</strong></p><p>Refine your smart-casual wardrobe with these heritage desert chukka boots. Sculpted from premium pull-up leather that develops a unique vintage patina over time, these ankle-high boots feature a minimalist two-eyelet design. Stitched seamlessly onto a traditional textured crepe sole, they offer natural shock absorption and an incredibly smooth ride.</p><ul><li>Premium distressed leather upper for an authentic, rugged finish</li><li>Iconic minimalist two-eyelet lace-up configuration with tonal cotton laces</li><li>Durable crepe rubber sole provides flexible, all-day comfort</li><li>Precision contrast welt stitching for long-lasting construction strength</li></ul>",
    type: "Boots",
    tags: "boots, boot, kixro-essentials, best-sellers",
    variants_colors: [
      {
        color: "Brown",
        price: "165.00",
        compare_at_price: "195.00",
        category_folder: "boots",
        image_file: "ChatGPT Image Jul 18, 2026, 01_39_35 AM.png"
      }
    ]
  },
  {
    // Merged: Rugged Moc-Toe Leather Work Boots (Brown) + Waterproof Heritage Ankle Boots (Black)
    // No color in title
    handle: "rugged-moc-toe-leather-work-boots",
    title: "Rugged Moc-Toe Leather Work Boots",
    body_html: "<p><strong>Heritage craftsmanship built to conquer rugged environments.</strong></p><p>Crafted with thick full-grain leather and weather-resistant construction, these boots combine industrial durability with all-day comfort. Featuring reinforced eyelets and deep-lugged outsoles, they deliver dependable traction across slick pavements and rugged outdoor trails.</p><ul><li>Premium full-grain weather-resistant leather</li><li>Plush padded collar for superior ankle support</li><li>Heavy-duty lugged outsole for exceptional traction</li><li>Precision contrast welt stitching for enduring strength</li></ul>",
    type: "Boots",
    tags: "boots, boot, best-sellers, kixro-essentials, new-arrivals, trending-now",
    variants_colors: [
      {
        color: "Navy Blue",
        price: "195.00",
        compare_at_price: "230.00",
        category_folder: "boots",
        image_file: "ChatGPT Image Jul 18, 2026, 01_39_49 AM.png"
      },
      {
        color: "Black",
        price: "175.00",
        compare_at_price: "210.00",
        category_folder: "boots",
        image_file: "ChatGPT Image Jul 18, 2026, 01_39_41 AM.png"
      }
    ]
  },

  // ==========================================
  // LOAFERS (3 products: 2 standalone + 1 consolidated)
  // ==========================================
  {
    handle: "premium-suede-loafers-striped-accent",
    title: "Premium Suede Loafers with Striped Accent – Slate Blue",
    body_html: "<p><strong>Effortless sophistication meets slip-on comfort.</strong></p><p>Step into refined style with these lightweight, slate blue driving loafers. Crafted from ultra-soft faux suede with classic moc-toe stitching, they feature a distinctive brown and tan striped webbing accent across the vamp for a subtle pop of contrast. Designed with a flexible low-profile sole and a cushioned footbed, these loafers transition seamlessly from casual weekdays to relaxed weekend getaways.</p><ul><li>Premium textured suede-feel upper for a sophisticated matte look</li><li>Striped contrast webbing strap across the vamp adds a modern design detail</li><li>Classic moc-toe stitched detailing for a timeless silhouette</li><li>Flexible, low-profile rubber outsole for superior driving grip and walking comfort</li></ul>",
    type: "Loafers",
    tags: "loafers, loafer, best-sellers, new-arrivals, trending-now",
    variants_colors: [
      {
        color: "Slate Blue",
        price: "130.00",
        compare_at_price: "155.00",
        category_folder: "lofer",
        image_file: "ChatGPT Image Jul 18, 2026, 01_40_35 AM.png"
      }
    ]
  },
  {
    handle: "woven-canvas-slip-on-mule-sneakers",
    title: "Woven Canvas Slip-On Mule Sneakers – Heather Grey",
    body_html: "<p><strong>The ultimate blend of casual ease and classic style.</strong></p><p>Redefine your laid-back look with these lightweight, backless mule sneakers. Featuring a breathable, woven canvas upper in a versatile heather grey, these shoes offer the polished look of a traditional slip-on with the effortless convenience of a slide. Grounded by a unique braided-texture cream midsole, they deliver exceptional comfort for lounging at home or running quick errands around town.</p><ul><li>Breathable woven canvas upper ensures cool, lightweight ventilation</li><li>Backless mule design allows for fast, hands-free slide-on wear</li><li>Dual elastic goring inserts provide a flexible, adaptive fit across the vamp</li><li>Durable cream rubber outsole with a stylish braided-pattern sidewall</li></ul>",
    type: "Loafers",
    tags: "loafers, loafer, kixro-essentials, trending-now",
    variants_colors: [
      {
        color: "Grey",
        price: "95.00",
        compare_at_price: "115.00",
        category_folder: "lofer",
        image_file: "ChatGPT Image Jul 18, 2026, 01_40_43 AM.png"
      }
    ]
  },
  {
    // Merged: Classic Suede Slip-On Loafers (Taupe) + Handcrafted Penny Loafer (Black)
    // No color in title
    handle: "classic-suede-slip-on-loafers",
    title: "Classic Suede Slip-On Loafers",
    body_html: "<p><strong>Timeless minimal style for everyday luxury.</strong></p><p>Elevate your wardrobe with these sleek, minimalist slip-on loafers. Offered in velvety soft suede and burnished leather finishes, these shoes provide a clean and understated silhouette. Finished with traditional stitched moc-toe detailing and paired with flexible low-profile outsoles, they deliver unmatched refinement that pairs effortlessly with chinos, trousers, or denim.</p><ul><li>Velvety soft suede and premium burnished finishes</li><li>Clean minimalist profile suitable for dress or casual wear</li><li>Classic raised moc-toe hand-stitched detailing</li><li>Flexible lightweight rubber outsole for all-day walking ease</li></ul>",
    type: "Loafers",
    tags: "loafers, loafer, kixro-essentials, best-sellers, new-arrivals, trending-now",
    variants_colors: [
      {
        color: "Taupe",
        price: "140.00",
        compare_at_price: "165.00",
        category_folder: "lofer",
        image_file: "ChatGPT Image Jul 18, 2026, 01_40_52 AM.png"
      },
      {
        color: "Black",
        price: "160.00",
        compare_at_price: "190.00",
        category_folder: "lofer",
        image_file: "ChatGPT Image Jul 18, 2026, 01_40_58 AM.png"
      }
    ]
  }
];

const fieldnames = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Variant Barcode",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Google Shopping / Google Product Category",
  "Google Shopping / Gender",
  "Google Shopping / Age Group",
  "Google Shopping / MPN",
  "Google Shopping / Condition",
  "Google Shopping / Custom Product",
  "Google Shopping / Custom Label 0",
  "Google Shopping / Custom Label 1",
  "Google Shopping / Custom Label 2",
  "Google Shopping / Custom Label 3",
  "Google Shopping / Custom Label 4",
  "Variant Image",
  "Variant Weight Unit",
  "Variant Tax Code",
  "Cost per item",
  "Status"
];

function escapeCSV(val) {
  if (val === undefined || val === null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const lines = [];
lines.push(fieldnames.map(escapeCSV).join(","));

for (const p of products) {
  let isFirstRowForProduct = true;
  let imagePosition = 1;

  // Build image map for colors
  const colorImages = p.variants_colors.map(vc => ({
    color: vc.color,
    url: `${GITHUB_REPO_RAW}/${vc.category_folder}/${encodeURIComponent(vc.image_file)}`
  }));

  for (const vc of p.variants_colors) {
    const variantImgUrl = `${GITHUB_REPO_RAW}/${vc.category_folder}/${encodeURIComponent(vc.image_file)}`;

    for (let sIndex = 0; sIndex < SIZES.length; sIndex++) {
      const size = SIZES[sIndex];
      const sku = `KIX-${p.handle.toUpperCase().slice(0, 8)}-${size}-${vc.color.toUpperCase().slice(0, 3)}`;

      // Attach image src to each color's first size row so Shopify indexes all product media
      const shouldIncludeImageSrc = sIndex === 0;
      const currentImgSrc = shouldIncludeImageSrc ? variantImgUrl : "";
      const currentImgPos = shouldIncludeImageSrc ? String(imagePosition++) : "";

      const row = {
        "Handle": p.handle,
        "Title": isFirstRowForProduct ? p.title : "",
        "Body (HTML)": isFirstRowForProduct ? p.body_html : "",
        "Vendor": isFirstRowForProduct ? "Kixro" : "",
        "Product Category": isFirstRowForProduct ? "Apparel & Accessories > Shoes" : "",
        "Type": isFirstRowForProduct ? p.type : "",
        "Tags": isFirstRowForProduct ? p.tags : "",
        "Published": isFirstRowForProduct ? "TRUE" : "",
        "Option1 Name": "Size",
        "Option1 Value": size,
        "Option2 Name": "Color",
        "Option2 Value": vc.color,
        "Option3 Name": "",
        "Option3 Value": "",
        "Variant SKU": sku,
        "Variant Grams": "900",
        "Variant Inventory Tracker": "shopify",
        "Variant Inventory Qty": "20",
        "Variant Inventory Policy": "deny",
        "Variant Fulfillment Service": "manual",
        "Variant Price": vc.price,
        "Variant Compare At Price": vc.compare_at_price,
        "Variant Requires Shipping": "TRUE",
        "Variant Taxable": "TRUE",
        "Variant Barcode": "",
        "Image Src": currentImgSrc,
        "Image Position": currentImgPos,
        "Image Alt Text": currentImgSrc ? `${p.title} - ${vc.color}` : "",
        "Gift Card": isFirstRowForProduct ? "FALSE" : "",
        "SEO Title": isFirstRowForProduct ? p.title : "",
        "SEO Description": isFirstRowForProduct ? p.title : "",
        "Google Shopping / Google Product Category": "",
        "Google Shopping / Gender": "Unisex",
        "Google Shopping / Age Group": "Adult",
        "Google Shopping / MPN": "",
        "Google Shopping / Condition": "new",
        "Google Shopping / Custom Product": "",
        "Google Shopping / Custom Label 0": p.type,
        "Google Shopping / Custom Label 1": "",
        "Google Shopping / Custom Label 2": "",
        "Google Shopping / Custom Label 3": "",
        "Google Shopping / Custom Label 4": "",
        "Variant Image": variantImgUrl,
        "Variant Weight Unit": "lb",
        "Variant Tax Code": "",
        "Cost per item": "",
        "Status": isFirstRowForProduct ? "active" : ""
      };

      lines.push(fieldnames.map(f => escapeCSV(row[f])).join(","));
      isFirstRowForProduct = false;
    }
  }
}

fs.writeFileSync("kixro_products_import.csv", lines.join("\n"), "utf-8");
console.log(`Successfully generated kixro_products_import.csv with ${products.length} products and ${lines.length - 1} rows.`);
