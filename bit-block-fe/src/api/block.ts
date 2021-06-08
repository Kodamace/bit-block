import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./client";
const blocksEndPoint = `http://localhost:3002/blocks`;

export const getBlocks = createAsyncThunk("blocks/getBlocks", async (value) => {
  const response = await client.get(blocksEndPoint);
  // The value we return becomes the `fulfilled` action payload

  return response;
});

export const getSingleBlock = createAsyncThunk(
  "block/getSingleBlock",
  async (hash: string) => {
    const response = await client.get(`${blocksEndPoint}/${hash}`);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
