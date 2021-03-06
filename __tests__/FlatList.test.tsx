import 'react-native'
import React from 'react'
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from 'react-native-testing-library'
import {expect, it} from '@jest/globals'
import SectionList from '../src/components/FlatList'

const eventData = {
  nativeEvent: {
    contentOffset: {
      x: 0,
      y: 425,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 885,
      width: 328,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 469,
      width: 328,
    },
  },
}

it('scrolls to top and refreshes all items', async () => {
  const {getByText, getByTestId} = render(<SectionList />)

  getByText(/pizza/i)
  expect(() => getByText(/the impossible burger/i)).toThrow(
    /no instances found/i,
  ) //intially not shown
  fireEvent.scroll(getByTestId('flat-list'), eventData)
  await waitForElementToBeRemoved(() => getByText(/loading more dishes/i))
  await waitFor(() => expect(getByText(/the impossible burger/i)))
})
