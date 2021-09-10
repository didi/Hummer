//
//  AppDelegate.swift
//  App
//
//  Created by 唐佳诚 on 2021/8/17.
//

import UIKit
import Hummer

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        Hummer.startEngine(nil)
        window = UIWindow(frame: UIScreen.main.bounds)
        guard let viewController = ViewController(url: "http://localhost:8000/index.js", params: nil) else { return true }
        let navigationController = UINavigationController(rootViewController: viewController)
        navigationController.navigationBar.isTranslucent = false;
        window?.rootViewController = navigationController;
        window?.makeKeyAndVisible()
        
        return true
    }

}

