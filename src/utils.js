// DATA FOR BAR CHART
export const barChartData = (customSongValue, regularSongValue) => {
  return [
    {
      category: 'Custom',
      value: customSongValue,
    },
    {
      category: 'Category1',
      value: regularSongValue.category_7,
    },
    {
      category: 'Category2',
      value: regularSongValue.category_8,
    },
    {
      category: 'Category3',
      value: regularSongValue.category_9,
    },
    {
      category: 'Category4',
      value: regularSongValue.category_10,
    },
  ]
}

// DISABLE BUTTON BASED ON CERTAIN CONDITIONS
export const disableElements = (
  disabled,
  customSongValue,
  regularSongValue,
  isLoading
) => {
  if (disabled || isLoading) {
    return true
  } else if (customSongValue < 99) {
    return true
  } else if (regularSongValue.category_7 < 79) {
    return true
  } else if (regularSongValue.category_8 < 59) {
    return true
  } else if (regularSongValue.category_9 < 39) {
    return true
  } else if (regularSongValue.category_10 < 19) {
    return true
  } else {
    return false
  }
}
