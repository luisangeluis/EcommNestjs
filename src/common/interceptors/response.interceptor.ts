import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        return next.handle().pipe(
            map(data => {
                let formattedData;

                // Detectar si es paginación por estructura
                if (data && typeof data === 'object' && 'items' in data && 'meta' in data) {
                    // Lista paginada
                    formattedData = {
                        items: data.items,
                        meta: data.meta,
                    };
                } else {
                    // Objeto único
                    formattedData = data;
                }

                return {
                    success: true,
                    data: formattedData,
                    message: 'Operation successful',
                    timestamp: new Date().toISOString(),
                };
            }),
        );
    }
}
