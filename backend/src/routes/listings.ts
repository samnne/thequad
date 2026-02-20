import { type Request, type Response, Router } from "express";
import {
  createNewListing,
  deleteListing,
  getListingByID,
  getListings,
  updateListing,
} from "../db/listings.db.ts";
import { ErrorMessage } from "../utils/utils.ts";
import { getSession } from "../middleware/auth.ts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const listings = await getListings();

    return res.json({
      listings,
    });
  } catch (error) {
    console.log(error);
    return res.json(ErrorMessage("Failed to Fetch Listings", 500));
  }
});
router.post("/", getSession, async (req, res) => {
  const listingFormData: listingFormData = req.body;
  try {
    const createdListing = await createNewListing(listingFormData);

    return res.json({
      message: "Successfully Created Listing",
      listing: createdListing,
    });
  } catch (error) {
    console.log(error);
    return res.json(ErrorMessage("Failed to Create Listing", 500));
  }
});

router.get("/:lid", async (req: Request, res: Response) => {
  const { lid } = req.params;
  try {
    if (!lid) {
      return res.json(ErrorMessage("ID not provided error", 500));
    }
    const listing = await getListingByID(lid);

    return res.json({
      message: "Successfully found Listing",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.json(ErrorMessage("Failed to Fetch Listing", 500));
  }
});

router.put("/:lid", async (req: Request, res: Response) => {
  const { lid } = req.params;
  const listingFormData: listingFormData = req.body;
  try {
    if (!lid) {
      return res.json(ErrorMessage("ID not provided error", 500));
    }
    const listing = await updateListing(lid, listingFormData);

    return res.status(200).json({
      message: "Succesfully updated Listing",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.json(ErrorMessage("Failed to Fetch Listing", 500));
  }
});
router.delete("/:lid", async (req: Request, res: Response) => {
  const { lid } = req.params;

  try {
    if (!lid) {
      return res.json(ErrorMessage("ID not provided error", 500));
    }
    const listing = await deleteListing(lid);

    return res.status(200).json({
      message: "Succesfully deleted Listing",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.json(ErrorMessage("Failed to Fetch Listing", 500));
  }
});

export default router;
