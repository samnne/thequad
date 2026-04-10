"use client";

import { ConvoWithRelations } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  convos: ConvoWithRelations[];
};

const ConversationCards = ({ convos }: Props) => {
  return (
    <div className="flex gap-2 w-full py-2 overflow-x-auto no-scrollbar">
      {convos.map((convo, i) => {
        const listing = convo.listing;

        return (
          <motion.div
            key={convo.cid}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: [25, 0], opacity: [0, 1] }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => redirect(`/conversations/${convo.cid}`)}
            className="flex items-center gap-3 min-w-60 rounded-2xl border shadow shadow-black/30 bg-white p-3 active:scale-[0.98] transition-transform"
          >
            {/* Image */}
            {listing.imageUrls?.[0] && (
              <Image
                src={listing.imageUrls[0]}
                alt={listing.title}
                width={60}
                height={60}
                className="w-14 h-14 rounded-xl object-cover"
              />
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <h4 className="font-semibold text-black truncate">
                {listing.title}
              </h4>

            
              <span className="text-sm font-bold">
                {listing.price === 0
                  ? "Free"
                  : `$${listing.price}`}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ConversationCards;