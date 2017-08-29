// note: the dynWorkspace variable has to be change to import the json for that dyn file.
// before this is done, all dyn files need to be converted to json format from their xml format.

export default function loadAVP() {
  window.requirejs(["/js/avp/AVP.min.js"], function(AVP) {
    var Logger = new AVP.Logger();
    var simpleStorage = new AVP.BaseStorage();
    var runner = new AVP.DynamoRunner(
      {},
      {
        url: "wss://websocket-grain-dev.dynamoreach.com",
        token: null,
        email: null
      }
    );
    var graphModel = AVP.createModel(AVP.GraphModel, {
      storage: simpleStorage,
      logger: Logger,
      runner: runner
    });
    var dynamoEditor = AVP.createComponent({
      type: "GraphEditor",
      selector: "#component1",
      model: graphModel
    });

    dynamoEditor.newWorkspace();

    var geometryViewer = AVP.createComponent({
      type: AVP.componentTypes.GeometryViewer,
      selector: "#component2",
      model: graphModel
    });

    var dynWorkspace = {
      Uuid: "e9cce0e0-b738-4bbf-be22-3e7b80a44d9b",
      IsCustomNode: false,
      Description: "",
      Name: "Home",
      ElementResolver: {
        ResolutionMap: {}
      },
      Nodes: [
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature: "==@var[]..[],var[]..[]",
          Id: "2674f33d-0182-434d-8689-b80f1d3bd6a9",
          Inputs: [
            {
              Id: "acd4a908-8ec3-42a5-a59e-a91ccb249b9a",
              Name: "x",
              Description: "x value.\n\nvar[]..[]",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            },
            {
              Id: "40b85b7c-54f6-4f0a-bfbc-286c35ff405a",
              Name: "y",
              Description: "y value.\n\nvar[]..[]",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "b515bb2d-8ea1-479e-b7d6-d5cd59fbcb68",
              Name: "var[]..[]",
              Description: "var[]..[]",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description:
            "Equal x to y?\n\n== (x: var[]..[], y: var[]..[]): var[]..[]"
        },
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature: "List.Equals@var,var",
          Id: "a5761867-f286-4f51-af0e-806f3c8dab5b",
          Inputs: [
            {
              Id: "1c53a04c-8f41-4931-bf60-c3af91fc64dc",
              Name: "objectA",
              Description: "var",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            },
            {
              Id: "784dc437-a8e3-4cbb-90ac-16217906a048",
              Name: "objectB",
              Description: "var",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "f66f739d-ca26-45c0-9c94-a972e8c32827",
              Name: "bool",
              Description: "bool",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description: "List.Equals (objectA: var, objectB: var): bool"
        },
        {
          ConcreteType: "CoreNodeModels.Watch, CoreNodeModels",
          NodeType: "ExtensionNode",
          Id: "ffdaab4c-053c-424c-a1ec-114302c83df0",
          Inputs: [
            {
              Id: "f2e3841b-d233-4e44-9386-06f709a3acb7",
              Name: "",
              Description: "Node to evaluate.",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "d2e2ee0b-0cef-4a07-927d-35d656b2bdf3",
              Name: "",
              Description: "Watch contents.",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Disabled",
          Description: "Visualize the output of node."
        },
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature:
            "Autodesk.DesignScript.Geometry.Circle.ByCenterPointRadius@Autodesk.DesignScript.Geometry.Point,double",
          Id: "37a2ea2c-e34b-4a01-950a-753c513832c0",
          Inputs: [
            {
              Id: "db24c519-03a5-49ed-9b07-0681fb0f5aba",
              Name: "centerPoint",
              Description:
                "Point\nDefault value : Autodesk.DesignScript.Geometry.Point.ByCoordinates(0, 0, 0)",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            },
            {
              Id: "a6c85e46-fff9-4cee-8b00-f3044ba7ee42",
              Name: "radius",
              Description: "double\nDefault value : 1",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "7b1ef88e-621c-426c-b66f-17c57c7d8c6e",
              Name: "Circle",
              Description: "Circle",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description:
            "Creates a Circle with input center Point and radius in the world XY plane, with world Z as normal.\n\nCircle.ByCenterPointRadius (centerPoint: Point = Autodesk.DesignScript.Geometry.Point.ByCoordinates(0, 0, 0), radius: double = 1): Circle"
        },
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature:
            "Autodesk.DesignScript.Geometry.Circle.ByCenterPointRadius@Autodesk.DesignScript.Geometry.Point,double",
          Id: "c234cf7e-99e5-4c80-823e-4c6588f007d9",
          Inputs: [
            {
              Id: "17a936ac-2a7d-4dcb-98d5-2f17673acd53",
              Name: "centerPoint",
              Description:
                "Point\nDefault value : Autodesk.DesignScript.Geometry.Point.ByCoordinates(0, 0, 0)",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            },
            {
              Id: "051f5d68-56ca-490c-9bd2-a384226984ea",
              Name: "radius",
              Description: "double\nDefault value : 1",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "7de44e60-93e3-4450-b43f-0a3f3601df59",
              Name: "Circle",
              Description: "Circle",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description:
            "Creates a Circle with input center Point and radius in the world XY plane, with world Z as normal.\n\nCircle.ByCenterPointRadius (centerPoint: Point = Autodesk.DesignScript.Geometry.Point.ByCoordinates(0, 0, 0), radius: double = 1): Circle"
        },
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature: "Autodesk.DesignScript.Geometry.Circle.Radius",
          Id: "3125c32f-fa32-4958-b2d0-5c27ea6b1c11",
          Inputs: [
            {
              Id: "7aad2179-d9c2-4a2b-b357-323f721f5a78",
              Name: "circle",
              Description: "Autodesk.DesignScript.Geometry.Circle",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "263d6fb2-2f18-4af0-94a9-1a7ddfda0092",
              Name: "double",
              Description: "double",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description: "The radius of the circle\n\nCircle.Radius: double"
        },
        {
          ConcreteType: "Dynamo.Graph.Nodes.ZeroTouch.DSFunction, DynamoCore",
          NodeType: "FunctionNode",
          FunctionSignature: "Autodesk.DesignScript.Geometry.Circle.Radius",
          Id: "091330b4-4f61-41dc-b4da-ebf37e404da3",
          Inputs: [
            {
              Id: "cbf43a49-9178-4c93-9982-a85ca3a0b2b0",
              Name: "circle",
              Description: "Autodesk.DesignScript.Geometry.Circle",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Outputs: [
            {
              Id: "614e15b3-864c-46b9-84f7-30ea3c61b3c7",
              Name: "double",
              Description: "double",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Auto",
          Description: "The radius of the circle\n\nCircle.Radius: double"
        },
        {
          ConcreteType: "CoreNodeModels.Input.DoubleSlider, CoreNodeModels",
          NodeType: "FloatRangeInputNode",
          RangeMax: 5.0,
          RangeMin: 0.0,
          RangeStep: 1.0,
          InputValue: 2.0,
          Id: "a1fee892-43c5-4a4e-ac1d-dd96919abe0b",
          Inputs: [],
          Outputs: [
            {
              Id: "12755dcb-33f7-4160-b7d7-f67854f1d325",
              Name: "",
              Description: "Double",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Disabled",
          Description: "A slider that produces numeric values."
        },
        {
          ConcreteType: "CoreNodeModels.Input.DoubleSlider, CoreNodeModels",
          NodeType: "FloatRangeInputNode",
          RangeMax: 5.0,
          RangeMin: 0.0,
          RangeStep: 1.0,
          InputValue: 1.0,
          Id: "a455e131-045d-44df-810a-85709b4a9c4a",
          Inputs: [],
          Outputs: [
            {
              Id: "454a97d3-51ee-45bb-8d03-59519fcccb96",
              Name: "",
              Description: "Double",
              Level: 2,
              UseLevels: false,
              KeepListStructure: false
            }
          ],
          Replication: "Disabled",
          Description: "A slider that produces numeric values."
        }
      ],
      Connectors: [
        {
          Start: "f66f739d-ca26-45c0-9c94-a972e8c32827",
          End: "f2e3841b-d233-4e44-9386-06f709a3acb7",
          Id: "853871f1-8bfa-4411-981d-13150bc07e45"
        },
        {
          Start: "7b1ef88e-621c-426c-b66f-17c57c7d8c6e",
          End: "7aad2179-d9c2-4a2b-b357-323f721f5a78",
          Id: "665d0441-a6ae-445e-989e-b7cb2ccb02d6"
        },
        {
          Start: "7de44e60-93e3-4450-b43f-0a3f3601df59",
          End: "cbf43a49-9178-4c93-9982-a85ca3a0b2b0",
          Id: "dc77d92a-b608-4d6e-9296-ae0c1253bf78"
        },
        {
          Start: "263d6fb2-2f18-4af0-94a9-1a7ddfda0092",
          End: "1c53a04c-8f41-4931-bf60-c3af91fc64dc",
          Id: "bc484c84-10e8-4901-b8ec-3dea59ea280a"
        },
        {
          Start: "614e15b3-864c-46b9-84f7-30ea3c61b3c7",
          End: "784dc437-a8e3-4cbb-90ac-16217906a048",
          Id: "c6cfac98-9967-4e8c-9475-86603d92f4b1"
        },
        {
          Start: "12755dcb-33f7-4160-b7d7-f67854f1d325",
          End: "a6c85e46-fff9-4cee-8b00-f3044ba7ee42",
          Id: "f729158d-73d2-4914-ad3d-e310864046c5"
        },
        {
          Start: "454a97d3-51ee-45bb-8d03-59519fcccb96",
          End: "051f5d68-56ca-490c-9bd2-a384226984ea",
          Id: "9fe45d7b-1c42-4754-b2db-8ea9f81399d2"
        }
      ],
      Dependencies: [],
      Bindings: [],
      View: {
        Cameras: {
          EyePosition: "-2.23121452331543,4.7301812171936,4.99812984466553",
          UpDirection:
            "0.0716614201664925,0.904827058315277,-0.419705420732498",
          LookDirection: "1.35085463523865,-6.17640352249146,-7.91166353225708",
          Name: "Background Preview"
        },
        NodeViews: [
          {
            IsVisible: true,
            Name: "==",
            Id: "2674f33d-0182-434d-8689-b80f1d3bd6a9",
            IsUpstreamVisible: true,
            X: 934.897738954333,
            Y: 3428.01062144682
          },
          {
            IsVisible: true,
            Name: "List.Equals",
            Id: "a5761867-f286-4f51-af0e-806f3c8dab5b",
            IsUpstreamVisible: true,
            X: 1058.4,
            Y: 299.2
          },
          {
            IsVisible: true,
            Name: "Watch",
            Id: "ffdaab4c-053c-424c-a1ec-114302c83df0",
            IsUpstreamVisible: true,
            X: 1244.0,
            Y: 299.2
          },
          {
            IsVisible: true,
            Name: "Circle.ByCenterPointRadius",
            Id: "37a2ea2c-e34b-4a01-950a-753c513832c0",
            IsUpstreamVisible: true,
            X: 629.6,
            Y: 249.6
          },
          {
            IsVisible: true,
            Name: "Circle.ByCenterPointRadius",
            Id: "c234cf7e-99e5-4c80-823e-4c6588f007d9",
            IsUpstreamVisible: true,
            X: 629.6,
            Y: 371.2
          },
          {
            IsVisible: true,
            Name: "Circle.Radius",
            Id: "3125c32f-fa32-4958-b2d0-5c27ea6b1c11",
            IsUpstreamVisible: true,
            X: 848.0,
            Y: 250.4
          },
          {
            IsVisible: true,
            Name: "Circle.Radius",
            Id: "091330b4-4f61-41dc-b4da-ebf37e404da3",
            IsUpstreamVisible: true,
            X: 839.999999999999,
            Y: 371.2
          },
          {
            IsVisible: true,
            Name: "Number Slider",
            Id: "a1fee892-43c5-4a4e-ac1d-dd96919abe0b",
            IsUpstreamVisible: true,
            X: 228.8,
            Y: 275.2
          },
          {
            IsVisible: true,
            Name: "Number Slider",
            Id: "a455e131-045d-44df-810a-85709b4a9c4a",
            IsUpstreamVisible: true,
            X: 228.8,
            Y: 398.0
          }
        ],
        Notes: [],
        Annotations: [],
        X: -281.90277,
        Y: -269.040481447084,
        Zoom: 1.33823125
      }
    };
    var controllerModel = AVP.createModel(AVP.ControllerApp, {});
    controllerModel.addEventListeners(geometryViewer);
    controllerModel.addEventListeners(dynamoEditor);
    dynamoEditor.openWorkspace(dynWorkspace, function(workspsace) {
      dynamoEditor.view.currentWorkspaceView.zoomAll();
    });
  });
}
