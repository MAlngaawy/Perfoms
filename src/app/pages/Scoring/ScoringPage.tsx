import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const ScoringPage = (props: Props) => {
  return (
    <div>
      <Link to={"1/scoring-tables"}>Scoring</Link>
    </div>
  );
};

export default ScoringPage;
