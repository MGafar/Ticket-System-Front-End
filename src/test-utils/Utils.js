import { act } from 'react-dom/test-utils';
import { Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export const whenStable = async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };