export class DateHelper {
    constructor(private start: string, private end: string) {}

    private startData = new Date(this.start);
    private endData = new Date(this.end);
    monthEqual = this.startData.getMonth() === this.endData.getMonth();
    datesEqual =
        this.startData.toLocaleDateString('ru') ===
        this.endData.toLocaleDateString('ru');

    get startDate() {
        return this.monthEqual
            ? this.startData.toLocaleDateString('ru', {
                  day: 'numeric',
              })
            : this.startData.toLocaleDateString('ru', {
                  day: 'numeric',
                  month: 'numeric',
              });
    }

    get endDate() {
        return this.endData && this.monthEqual
            ? ' - ' +
                  this.endData.toLocaleDateString('ru', {
                      day: 'numeric',
                  })
            : this.endData.toLocaleDateString('ru', {
                  day: 'numeric',
                  month: 'numeric',
              });
    }

    get fullMonth() {
        return (
            this.monthEqual &&
            this.endData &&
            ' ' +
                this.startData
                    .toLocaleDateString('ru', {
                        month: 'long',
                    })
                    .replace(/.$/, 'я')
        );
    }
}
