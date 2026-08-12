# Builds the favicons from the brand logo.
#
# src/assets/logo.png is white on transparency, so it disappears against a
# light browser tab. This crops the "naturals" wordmark out of it by alpha
# bounds — dropping the "World's fastest growing salon chain" tagline, which is
# hopeless at icon sizes — and sets it white on a plum rounded square, writing
# public/favicon-32.png and public/apple-touch-icon.png.
#
# The wordmark is ~4.7:1, so in a square tile it can only ever be a thin band.
# It reads at 180px (the apple-touch size); at the 16px a browser tab actually
# renders it is a plum tile with a white smudge. Set $USE_GLYPH = $true below to
# fall back to the wordmark's own leading "n", which stays legible at 16px.
#
#   powershell -File scripts/make-favicon.ps1

$USE_GLYPH = $false

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = [System.Drawing.Bitmap]::new((Join-Path $root "src\assets\logo.png"))
$W = $src.Width; $H = $src.Height

# --- rows that carry ink, so the tagline band can be excluded ---------------
$rowHas = New-Object bool[] $H
for ($y = 0; $y -lt $H; $y++) {
  for ($x = 0; $x -lt $W; $x++) {
    if ($src.GetPixel($x, $y).A -gt 60) { $rowHas[$y] = $true; break }
  }
}
# first contiguous inked band = the "naturals" wordmark (tagline sits below it)
$by0 = 0; while ($by0 -lt $H -and -not $rowHas[$by0]) { $by0++ }
$by1 = $by0; while ($by1 -lt $H - 1 -and $rowHas[$by1 + 1]) { $by1++ }
"wordmark band: y $by0..$by1"

# --- horizontal bounds ------------------------------------------------------
$colHas = New-Object bool[] $W
for ($x = 0; $x -lt $W; $x++) {
  for ($y = $by0; $y -le $by1; $y++) {
    if ($src.GetPixel($x, $y).A -gt 60) { $colHas[$x] = $true; break }
  }
}
$x0 = 0; while ($x0 -lt $W -and -not $colHas[$x0]) { $x0++ }
$x1 = $W - 1; while ($x1 -gt $x0 -and -not $colHas[$x1]) { $x1-- }

if ($USE_GLYPH) {
  # letters in this wordmark are separated by a single blank column, so a
  # one-column gap is what ends the leading "n"
  for ($x = $x0 + 5; $x -lt $W - 1; $x++) {
    if (-not $colHas[$x]) { $x1 = $x - 1; break }
  }
}

# tighten the vertical bounds to the glyph itself
$y0 = $by1; $y1 = $by0
for ($x = $x0; $x -le $x1; $x++) {
  for ($y = $by0; $y -le $by1; $y++) {
    if ($src.GetPixel($x, $y).A -gt 60) {
      if ($y -lt $y0) { $y0 = $y }
      if ($y -gt $y1) { $y1 = $y }
    }
  }
}
$gw = $x1 - $x0 + 1
$gh = $y1 - $y0 + 1
"crop box: x $x0..$x1  y $y0..$y1  ($gw x $gh)"

# how much of the tile the crop fills. A near-square glyph can take the same
# fraction both ways; the wordmark is scaled to the tile's width and lands
# wherever its aspect ratio puts it vertically.
$fillW = if ($USE_GLYPH) { 0.58 } else { 0.86 }
$fillH = if ($USE_GLYPH) { 0.58 } else { 0.70 }

function New-Icon([int]$size, [string]$out) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $g.InterpolationMode = "HighQualityBicubic"
  $g.PixelOffsetMode = "HighQuality"
  $g.Clear([System.Drawing.Color]::Transparent)

  # plum rounded square, same 22% corner radius as the mark it replaces
  $r = [int]($size * 0.22); $d = $r * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0, 0, $d, $d, 180, 90)
  $path.AddArc($size - $d, 0, $d, $d, 270, 90)
  $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
  $path.AddArc(0, $size - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#7E4798"))
  $g.FillPath($brush, $path)

  # the crop, centred
  $scale = [Math]::Min(($size * $script:fillW) / $script:gw, ($size * $script:fillH) / $script:gh)
  $dw = [single]($script:gw * $scale)
  $dh = [single]($script:gh * $scale)
  $dx = [single](($size - $dw) / 2.0)
  $dy = [single](($size - $dh) / 2.0)
  $dest = [System.Drawing.RectangleF]::new($dx, $dy, $dw, $dh)
  $srcRect = [System.Drawing.RectangleF]::new([single]$script:x0, [single]$script:y0, [single]$script:gw, [single]$script:gh)
  $g.DrawImage($script:src, $dest, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $path.Dispose()
  "wrote $out"
}

New-Icon 32  (Join-Path $root "public\favicon-32.png")
# 64 is the device-pixel size of a 32px tab slot on a 2x display — worth
# shipping when the mark is this fine
New-Icon 64  (Join-Path $root "public\favicon-64.png")
New-Icon 180 (Join-Path $root "public\apple-touch-icon.png")
$src.Dispose()
