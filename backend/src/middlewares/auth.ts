
// import { expressjwt } from "express-jwt";
// import secret from "../configs/secret";

// const requireToken = expressjwt({
//   secret: secret.key,
//   algorithms: ["HS256"],
// });


// export default requireToken;

import { expressjwt } from "express-jwt";
import secret from "../configs/secret";

export default expressjwt({
  secret: secret.key,
  algorithms: ["HS256"],
});


