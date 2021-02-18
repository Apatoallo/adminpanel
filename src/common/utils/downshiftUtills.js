const EVENT_TYPES = {
  MOUSE_UP: {
    VALUE_STR: '__autocomplete_mouseup__',
    VALUE_INT: 1
  },
  CLICK_ITEM: {
    VALUE_STR: '__autocomplete_click_item__',
    VALUE_INT: 7
  },
  BLUR_INPUT: {
    VALUE_STR: '__autocomplete_blur_input__',
    VALUE_INT: 8
  },
  TOUCH_START: {
    VALUE_STR: '__autocomplete_touchstart__',
    VALUE_INT: 14
  }
};

export const isDownshiftEvent = (eventType, desiredType) => {
  return (
    eventType === EVENT_TYPES[desiredType].VALUE_INT ||
    eventType === EVENT_TYPES[desiredType].VALUE_STR
  );
};
