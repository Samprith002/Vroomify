"use client";

import { CarIcon } from "lucide-react";
import { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { audiowide, raleway } from "@/utils/fonts";
import Link from "next/link";

export default function Home() {
  const carControls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const x = useMotionValue(-75);

  useEffect(() => {
    const startCarAnimation = async () => {
      carControls.start({
        x: 220,
        transition: { duration: 3 },
      });
    };

    const buttonAnimation = async () => {
      buttonControls.start({
        opacity: 1,
        transition: { delay: 4, duration: 2 },
      });
    };

    x.onChange((latestX) => {
      if (latestX >= -180 && latestX <= -170) {
        textControls.start({
          opacity: 1,
          transition: { ease: "easeOut", duration: 2 },
        });
      }
    });

    startCarAnimation();
    buttonAnimation();
  }, [carControls, textControls, x]);

  return (
    <div
      className={cn(
        "w-screen h-screen flex flex-col items-center justify-center"
      )}
    >
      <motion.div style={{ x }} initial={{ x: "-75vw" }} animate={carControls}>
        <CarIcon size={50} id="car" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={textControls}>
        <h1 className={cn("text-8xl font-bold font-audiowide")}>Vroomify</h1>
      </motion.div>
      <motion.div
        className="mt-2 mb-5"
        initial={{ opacity: 0 }}
        animate={textControls}
      >
        <span className={cn("text-2xl font-raleway")}>
          Revving up production, one gear at a time.
        </span>
      </motion.div>
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={buttonControls}
      >
        <Link
          href={"/dashboard"}
          className="px-7 py-3 text-lg bg-black text-white rounded-md border-black transition hover:bg-gray-900 duration-300 ease-in-out"
        >
          Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
