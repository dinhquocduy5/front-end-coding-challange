import * as moment from "moment";
import React from "react";

function FormatDate(date) {
  const d = new Date(date);
  const yourDate = d.toLocaleDateString("fr-CH");

  return yourDate;
}

export default FormatDate;
