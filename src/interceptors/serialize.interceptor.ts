import { ExecutionContext, CallHandler, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new(...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

  public constructor(private dto: ClassConstructor) { }

  public intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {


    // Run something after the response is sent out
    return handler.handle().pipe(
      map((data: any) => {
        console.log(data)
        // Run something before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}