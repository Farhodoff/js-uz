import { jsWhat } from "./lessons/beginner/js-what";
import { variables } from "./lessons/beginner/variables";
import { dataTypesLesson } from "./lessons/beginner/dataTypes";
import { moreDataTypesLesson } from "./lessons/beginner/moreDataTypes";
import { primitivesVsObjects } from "./lessons/beginner/primitivesVsObjects";
import { scopeLesson } from "./lessons/beginner/scope";
import { functionScopeLesson } from "./lessons/beginner/functionScope";
import { blockScopeLesson } from "./lessons/beginner/blockScope";
import { globalScopeLesson } from "./lessons/beginner/globalScope";
import { hoistingThisLesson } from "./lessons/beginner/hoistingThis";
import { typeofLesson } from "./lessons/beginner/typeof";
import { operators } from "./lessons/beginner/operators";
import { loops } from "./lessons/beginner/loops";
import { functions } from "./lessons/beginner/functions";
import { arrays } from "./lessons/beginner/arrays";
import { objects } from "./lessons/beginner/objects";

import { destructuring } from "./lessons/intermediate/destructuring";
import { spreadRest } from "./lessons/intermediate/spreadRest";
import { arrowFunctions } from "./lessons/intermediate/arrowFunctions";
import { domBasics } from "./lessons/intermediate/dom";
import { events } from "./lessons/intermediate/events";
import { higherOrderArrays } from "./lessons/intermediate/higherOrderArrays";
import { classesLesson } from "./lessons/intermediate/classes";

import { callbacksLesson } from "./lessons/advanced/callbacks";
import { promises } from "./lessons/advanced/promises";
import { asyncAwait } from "./lessons/advanced/asyncAwait";
import { fetchApi } from "./lessons/advanced/fetch";
import { localStorageLesson } from "./lessons/advanced/localStorage";
import { moreDataTypesLesson } from "./lessons/beginner/moreDataTypes";
import { typeConversionLesson } from "./lessons/beginner/typeConversion";
import { primitivesVsObjects } from "./lessons/beginner/primitivesVsObjects";
...
import { debugging } from "./lessons/advanced/debugging";
import { closuresLesson } from "./lessons/advanced/closures";
import { eventLoopLesson } from "./lessons/advanced/eventLoop";
import { regexLesson } from "./lessons/advanced/regex";

import { todoList } from "./lessons/projects/todoList";

export const curriculum = {
  beginner: {
    label: "Boshlang'ich",
    color: "#c8a96e",
    icon: "🟢",
    lessons: [jsWhat, variables, dataTypesLesson, moreDataTypesLesson, typeConversionLesson, primitivesVsObjects, scopeLesson, functionScopeLesson, blockScopeLesson, globalScopeLesson, hoistingThisLesson, typeofLesson, operators, loops, functions, arrays, objects]
  },
  intermediate: {
    label: "O'rta daraja",
    color: "#e5b84f",
    icon: "🟡",
    lessons: [destructuring, spreadRest, arrowFunctions, domBasics, events, higherOrderArrays, classesLesson]
  },
  advanced: {
    label: "Advanced",
    color: "#e07b5a",
    icon: "🔴",
    lessons: [callbacksLesson, promises, asyncAwait, fetchApi, localStorageLesson, errorHandling, modulesLesson, debugging, closuresLesson, eventLoopLesson, regexLesson]
  },
    label: "Loyihalar",
    color: "#7a9e7e",
    icon: "🏗️",
    lessons: [todoList]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "projects"];
