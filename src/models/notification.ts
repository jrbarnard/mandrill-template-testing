export enum NotificationTypes {
    Warning,
    Info,
    Success,
    Danger,
}

class Notification {
    public type: NotificationTypes;
    public content: string = '';
    public removeAfterCount?: number = undefined;
    public dissmissable: boolean = false;

    constructor(content: string, type: NotificationTypes = NotificationTypes.Info) {
        this.content = content;
        this.type = type;
    }

    public removeAfter(removeAfter: number): Notification {
        this.removeAfterCount = removeAfter;
        return this;
    }

    public setDismissable(dissmissable: boolean): Notification {
        this.dissmissable = dissmissable;
        return this;
    }

    public isDissmissable(): boolean {
        return this.dissmissable;
    }

    public getContent(): string {
        return this.content;
    }

    public getTypeClass(): string {
        const mapping = {
            [NotificationTypes.Warning]: 'is-warning',
            [NotificationTypes.Info]: 'is-info',
            [NotificationTypes.Success]: 'is-success',
            [NotificationTypes.Danger]: 'is-danger',
        };

        return mapping[this.type];
    }
}

export default Notification;
