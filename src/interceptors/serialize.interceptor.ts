import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { ApiCode, ApiResponse } from 'src/types/api-response.dto';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  public constructor(private dto: ClassConstructor) {}

  public intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> {
    // Run something after the response is sent out
    return handler.handle().pipe(
      map((data: any) => {
        const response = context.switchToHttp().getResponse();

        // Run something before the response is sent out
        let successCode: ApiCode = ApiCode.ERROR;
        // check is response contains http exception
        if ([200, 201, 204].includes(response.statusCode)) {
          successCode = ApiCode.SUCCESS;
        }

        const transformedData = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });

        return new ApiResponse('Success', successCode, transformedData);
      }),
    );
  }
}
