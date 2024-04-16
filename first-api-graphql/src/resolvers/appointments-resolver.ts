import { Query, Resolver } from "type-graphql";

@Resolver()
export class AppointmentsResolver {
  @Query()
  async HelloWorld() {
    return "hello world!";
  }
}
