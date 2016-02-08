interface RoutingInterface {
    generate(path: string, params?:any);
}

declare var Routing: RoutingInterface;