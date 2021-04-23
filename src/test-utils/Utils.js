import { act } from 'react-dom/test-utils';
import { Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export const whenStable = async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

export const sampleCreateResponseJson = {
  data: require('../test-data/createResponse.json')
};

export const sampleGetbyIDJson = {
  data: require('../test-data/getByIDResponse.json')
}

export const sampleGetDepartments = {
  data: require('../test-data/readDepartments.json')
}

export const sampleGetTopics = {
  data: require('../test-data/readTopics.json')
}

export const sampleReadDataJson = {
  data: require('../test-data/readAll.json')
};

export const sampleDeleteDataJson = {
  data: require('../test-data/delete.json')
};

export const sampleMarkAsInProgressJson = {
  data: require('../test-data/markAsInProgress.json')
}