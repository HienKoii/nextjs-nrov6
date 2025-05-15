"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseItem } from "@/utils";

const LuckyContext = createContext();

export default function LuckyProvider({ children }) {
  const prizes = [
    {
      itemId: 1150,
      itemName: "Cuồng nộ 2",
      quantity: 100,
      image: "/images/wheel/10716.png",
      listOptions: [],
    },
    {
      itemId: 457,
      itemName: "Thỏi vàng",
      quantity: 200,
      image: "/images/wheel/4028.png",
      listOptions: [],
    },
    {
      itemId: 1151,
      itemName: "Bổ khí 2",
      quantity: 100,
      image: "/images/wheel/10715.png",
      listOptions: [],
    },
    {
      itemId: 457,
      itemName: "Thỏi vàng",
      quantity: 1000,
      image: "/images/wheel/4028.png",
      listOptions: [[30, 1]],
    },
    {
      itemId: 1152,
      itemName: "Bổ huyết 2",
      quantity: 100,
      image: "/images/wheel/10714.png",
      listOptions: [[30, 1]],
    },
    {
      itemId: 1153,
      itemName: "Giáp Xên bọ hung 2",
      quantity: 100,
      image: "/images/wheel/10712.png",
      listOptions: [[30, 1]],
    },
    {
      itemId: 457,
      itemName: "Thỏi vàng",
      quantity: 50000,
      image: "/images/wheel/4028.png",
      listOptions: [[30, 1]],
    },
    {
      itemId: 1154,
      itemName: "Ẩn danh 2",
      quantity: 100,
      image: "/images/wheel/10717.png",
      listOptions: [[30, 1]],
    },
  ];

  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateUserLuckyMoney = async (user, newLucky, newMoney) => {
    try {
      await axios.post(`/api/rose/user/update-lucky-money`, {
        userId: user.id,
        lucky: newLucky,
        money: newMoney,
      });
    } catch (err) {
      console.log("err updateUserLuckyMoney: ", err);
    }
  };

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/rose/winner");
      console.log("res fetchWinners: ", res);
      setWinners(res.data);
    } catch (err) {
      console.log("err fetchWinners: ", err);
    }
    setLoading(false);
  };

  // Hàm lưu lịch sử quay trúng thưởng vào DB
  const saveWinner = async (playerId, itemArr) => {
    try {
      await axios.post("/api/rose/winner", {
        playerId,
        item: JSON.stringify(itemArr),
      });
      fetchWinners();
    } catch (err) {
      // Có thể toast lỗi nếu muốn
    }
  };

  const updateArrItemMore = async (user, itemId, quantity, listOptions) => {
    try {
      await axios.post("/api/rose/player/update-arritemmore", {
        playerId: user.playerId,
        itemMore: baseItem(itemId, quantity, listOptions),
      });
    } catch (err) {
      console.log("err updateArrItemMore: ", err);
    }
  };

  const value = {
    prizes,
    loading,
    fetchWinners,
    winners,
    updateUserLuckyMoney,
    saveWinner,
    updateArrItemMore,
  };

  return <LuckyContext.Provider value={value}>{children}</LuckyContext.Provider>;
}

// Custom hook để sử dụng LuckyContext
export const useLucky = () => {
  const context = useContext(LuckyContext);
  if (!context) {
    throw new Error("useLucky must be used within an LuckyProvider");
  }
  return context;
};
