library(sf)
library(terra)
library(jsonlite)
library(elevatr)

# Define bounding box
eu_bb <- st_bbox(c(xmin = -25, ymin = 35, xmax = 45, ymax = 71))

# Create extent and convert to sf polygon
eu_sfc <- st_as_sfc(eu_bb)
eu_sf <- st_sf(eu_sfc, crs = 4326)

# Get elevation raster
dat <- get_elev_raster(
  locations = eu_sf,
  z = 6,
  clip = "locations"
)

# Aggregate raster
factor <- round(nrow(dat) / 100)
dat_agg <- aggregate(dat, factor)

# Convert raster to data frame
dat_df <- as.data.frame(dat_agg, xy = TRUE, na.rm = FALSE)

# Save as json
write_json(dat_df, "static/data/europe_elevation_profiles.json", pretty = TRUE)
