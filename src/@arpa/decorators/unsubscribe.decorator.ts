// eslint-disable-next-line @typescript-eslint/naming-convention
export const Unsubscribe = (): any => (constructor: any) => {
  const cOnDestroy = constructor.prototype.ngOnDestroy;
  /**
   * Decorate with custom onDestroy Hook.
   */
  constructor.prototype.ngOnDestroy = function() {
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        const property = this[prop];
        if (typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }
    }
    if (cOnDestroy) {
      cOnDestroy.apply(this);
    }
  };
};
