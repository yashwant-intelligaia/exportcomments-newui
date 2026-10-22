interface IActiveParams {
    userInfo?: IUserToken;
}

interface IMenuItem {
    items: IMenu[];
}

interface IMenu {
    active: boolean;
    name: string;
    id: string;
}

export { IActiveParams, IMenu, IMenuItem };
