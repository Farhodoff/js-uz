import { jsWhat } from "./lessons/beginner/js-what";
import { cheatSheet } from "./lessons/beginner/cheatSheet";
import { interviewQuestionsBeginner } from "./lessons/beginner/interviewQuestions";
import { variables } from "./lessons/beginner/variables";
import { dataTypesLesson } from "./lessons/beginner/dataTypes";
import { moreDataTypesLesson } from "./lessons/beginner/moreDataTypes";
import { typeConversionLesson } from "./lessons/beginner/typeConversion";
import { typeCasting } from "./lessons/beginner/typeCasting";
import { implicitCasting } from "./lessons/beginner/implicitCasting";
import { primitivesVsObjects } from "./lessons/beginner/primitivesVsObjects";
import { stringMethods } from "./lessons/beginner/stringMethods";
import { mathObject } from "./lessons/beginner/mathObject";
import { jsGotchas } from "./lessons/beginner/gotchas";
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
import { optionalChaining } from "./lessons/intermediate/optionalChaining";
import { interviewQuestionsIntermediate } from "./lessons/intermediate/interviewQuestions";
import { thisKeyword } from "./lessons/intermediate/thisKeyword";

import { callbacksLesson } from "./lessons/advanced/callbacks";
import { promises } from "./lessons/advanced/promises";
import { asyncAwait } from "./lessons/advanced/asyncAwait";
import { fetchApi } from "./lessons/advanced/fetch";
import { localStorageLesson } from "./lessons/advanced/localStorage";
import { errorHandling } from "./lessons/advanced/errorHandling";
import { modulesLesson } from "./lessons/advanced/modules";
import { debugging } from "./lessons/advanced/debugging";
import { closuresLesson } from "./lessons/advanced/closures";
import { eventLoopLesson } from "./lessons/advanced/eventLoop";
import { eventLoopDeep } from "./lessons/advanced/eventLoopDeep";
import { designPatterns } from "./lessons/advanced/designPatterns";
import { functionalProgramming } from "./lessons/advanced/functionalProgramming";
import { interviewQuestionsAdvanced } from "./lessons/advanced/interviewQuestions";
import { memoryManagement } from "./lessons/advanced/memoryManagement";
import { performanceOptimization } from "./lessons/advanced/performanceOptimization";
import { prototypesLesson } from "./lessons/advanced/prototypes";
import { advancedFetch } from "./lessons/advanced/advancedFetch";
import { closuresDeepDive } from "./lessons/advanced/closuresDeepDive";
import { securityLesson } from "./lessons/advanced/security";
import { unitTesting } from "./lessons/advanced/unitTesting";
import { metaprogramming } from "./lessons/advanced/metaprogramming";
import { regexLesson } from "./lessons/advanced/regex";

import { todoList } from "./lessons/projects/todoList";
import { weatherApp } from "./lessons/projects/weatherApp";

export const curriculum = {
  beginner: {
    label: "Boshlang'ich",
    color: "#c8a96e",
    icon: "🟢",
    lessons: [cheatSheet, interviewQuestionsBeginner, jsWhat, variables, dataTypesLesson, moreDataTypesLesson, typeConversionLesson, typeCasting, implicitCasting, primitivesVsObjects, stringMethods, mathObject, jsGotchas, scopeLesson, functionScopeLesson, blockScopeLesson, globalScopeLesson, hoistingThisLesson, typeofLesson, operators, loops, functions, arrays, objects]
  },
  intermediate: {
    label: "O'rta daraja",
    color: "#e5b84f",
    icon: "🟡",
    lessons: [interviewQuestionsIntermediate, thisKeyword, destructuring, spreadRest, arrowFunctions, domBasics, events, higherOrderArrays, optionalChaining, classesLesson]
  },
  advanced: {
    label: "Advanced",
    color: "#e07b5a",
    icon: "🔴",
    lessons: [interviewQuestionsAdvanced, securityLesson, unitTesting, metaprogramming, advancedFetch, closuresDeepDive, callbacksLesson, promises, asyncAwait, fetchApi, eventLoopDeep, designPatterns, functionalProgramming, memoryManagement, performanceOptimization, prototypesLesson, localStorageLesson, errorHandling, modulesLesson, debugging, closuresLesson, eventLoopLesson, regexLesson]
  },
  projects: {
    label: "Loyihalar",
    color: "#7a9e7e",
    icon: "🏗️",
    lessons: [todoList, weatherApp]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "projects"];
