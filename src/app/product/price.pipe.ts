import { Pipe, PipeTransform } from '@angular/core';
import { ProductPrice } from './product.types';
import { finalPrice, formatPrice } from './product.utils';

/**
 * `{{ price | price }}`          -> final price (discount applied)
 * `{{ price | price:'regular' }}` -> price before discount
 */
@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
  transform(price: ProductPrice, kind: 'final' | 'regular' = 'final'): string {
    const amount = kind === 'regular' ? price.amount : finalPrice(price);
    return formatPrice(amount, price.currency);
  }
}
