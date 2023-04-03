import React from "react";
import { cardsData } from "../../data/Data";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="card"
          style={{
            background: card.color.backGround,
            boxShadow: card.color.boxShadow,
          }}
          onClick={() => {
            if (card.title === "Products") {
              navigate("/products");
            } // Add more else-if clauses for other cards
          }}
        >
          <div className="card-title">
            {card.title}
            <div className="card-icon">
              <card.png />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
