"""
Remove the cream background from Kixro logo.png using flood-fill from corners.
Outputs a transparent PNG saved to assets/logo.png (overwrites in place).
"""

from PIL import Image

def color_distance(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5

def flood_fill_transparent(img, start_pixels, bg_color, tolerance=18):
    """Flood fill from seed pixels, making background transparent."""
    pixels = img.load()
    width, height = img.size
    visited = set()
    queue = list(start_pixels)

    while queue:
        x, y = queue.pop()
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue

        current = pixels[x, y]
        if color_distance(current, bg_color) > tolerance:
            continue

        visited.add((x, y))
        pixels[x, y] = (current[0], current[1], current[2], 0)

        queue.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])

    return img

def main():
    src = r'c:\Users\user\Documents\Kixro\asset\logo\logo.png'
    out = r'c:\Users\user\Documents\Kixro\assets\logo-brand.png'

    img = Image.open(src).convert('RGBA')
    width, height = img.size
    pixels = img.load()

    bg_color = pixels[5, 5]
    print(f"Background color detected: {bg_color}")

    # Seed from all 4 corners + edge midpoints for thorough coverage
    seeds = [
        (0, 0), (width-1, 0), (0, height-1), (width-1, height-1),
        (width//2, 0), (width//2, height-1),
        (0, height//2), (width-1, height//2),
    ]

    img = flood_fill_transparent(img, seeds, bg_color, tolerance=22)

    # Second pass: remove any remaining background pixels in enclosed regions
    # (e.g., inside the O and R cutouts). Since the logo only contains
    # dark navy and teal, any cream-like pixel is background.
    pixels = img.load()
    changed = 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0 and color_distance((r, g, b), bg_color[:3]) < 30:
                pixels[x, y] = (r, g, b, 0)
                changed += 1
    print(f"Second pass removed {changed} enclosed background pixels")

    img.save(out, 'PNG')
    print(f"Saved transparent logo to: {out}")
    print(f"Image size: {img.size}")

if __name__ == '__main__':
    main()
