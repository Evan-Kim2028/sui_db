
import { initSuilendCapsuleProcessor } from "./suilend/suilendCapsuleProcessor.js";
import { initSuilendMdropProcessor } from "./suilend/suilendMdropObjcProcessor.js";
import { initSuilendMdropPackageProcessor } from "./suilend/suilendMdropPackageProcessor.js";
import { initSuilendPointsProcessor } from "./suilend/suilendPointsProcessor.js";
import { initRootletProcessor } from "./nfts/rootletProcessor.js";
import { initAfEggProcessor } from "./nfts/af_eggs.js";
import { initMayaProcessor } from "./kriya/mayaProcessor.js";

initMayaProcessor();
initSuilendMdropProcessor();
initRootletProcessor();
// initAfEggProcessor();
initSuilendMdropPackageProcessor();
initSuilendCapsuleProcessor();
initSuilendPointsProcessor();
