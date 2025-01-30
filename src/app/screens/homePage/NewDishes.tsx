import Divider from "../../components/divider";
import { Box, Container, Stack } from "@mui/material";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  Typography,
} from "@mui/joy";
import { Visibility } from "@mui/icons-material";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../libs/config";
import { Product } from "../../../libs/types/product";
import { ProductCollection } from "../../../libs/enums/product.enum";
import { useHistory } from "react-router-dom";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));
export function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const history = useHistory();

  /**Handlers */
  const chosenDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">New Menu</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((ele: Product) => {
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;
                  const sizeVolume =
                    ele.productCollection === ProductCollection.DRINK
                      ? ele.productVolume + " L"
                      : ele.productSize + " SIZE";
                  return (
                    <Card
                      key={ele._id}
                      variant="outlined"
                      className="card"
                      onClick={() => chosenDishHandler(ele._id)}
                    >
                      <CardOverflow>
                        <div className="product-scale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className="title">
                              {ele.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className="price">
                              ₩{ele.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className="views">
                              {ele.productViews}
                              <Visibility
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                  <Box className="no-data">New Products are not available!</Box>
                )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
